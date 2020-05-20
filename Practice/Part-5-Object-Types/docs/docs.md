<h1>Object Types</h1><div><p>In many cases, you don&apos;t want to return a number or a string from an API. You want to return an object that has its own complex behavior. GraphQL is a perfect fit for this.</p><p>In GraphQL schema language, the way you define a new object type is the same way we have been defining the <code>Query</code> type in our examples. Each object can have fields that return a particular type, and methods that take arguments. For example, in the <a href="/graphql-js/passing-arguments/">Passing Arguments</a> documentation, we had a method to roll some random dice:</p><pre class="prism language-javascript">type Query <span class="punctuation">{</span>
  <span class="function">rollDice</span><span class="punctuation">(</span>numDice<span class="punctuation">:</span> Int<span class="operator">!</span><span class="punctuation">,</span> numSides<span class="punctuation">:</span> Int<span class="punctuation">)</span><span class="punctuation">:</span> <span class="punctuation">[</span>Int<span class="punctuation">]</span>
<span class="punctuation">}</span></pre><p>If we wanted to have more and more methods based on a random die over time, we could implement this with a <code>RandomDie</code> object type instead.</p><pre class="prism language-javascript">type RandomDie <span class="punctuation">{</span>
  <span class="function">roll</span><span class="punctuation">(</span>numRolls<span class="punctuation">:</span> Int<span class="operator">!</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="punctuation">[</span>Int<span class="punctuation">]</span>
<span class="punctuation">}</span>

type Query <span class="punctuation">{</span>
<span class="function">getDie</span><span class="punctuation">(</span>numSides<span class="punctuation">:</span> Int<span class="punctuation">)</span><span class="punctuation">:</span> RandomDie
<span class="punctuation">}</span></pre><p>Instead of a root-level resolver for the <code>RandomDie</code> type, we can instead use an ES6 class, where the resolvers are instance methods. This code shows how the <code>RandomDie</code> schema above can be implemented:</p><pre class="prism language-javascript"><span class="keyword">class</span> <span class="class-name">RandomDie</span> <span class="punctuation">{</span>
<span class="function">constructor</span><span class="punctuation">(</span>numSides<span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">this</span><span class="punctuation">.</span>numSides <span class="operator">=</span> numSides<span class="punctuation">;</span>
<span class="punctuation">}</span>

<span class="function">rollOnce</span><span class="punctuation">(</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">return</span> <span class="number">1</span> <span class="operator">+</span> Math<span class="punctuation">.</span><span class="function">floor</span><span class="punctuation">(</span>Math<span class="punctuation">.</span><span class="function">random</span><span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">\*</span> <span class="keyword">this</span><span class="punctuation">.</span>numSides<span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>

<span class="function">roll</span><span class="punctuation">(</span><span class="punctuation">{</span>numRolls<span class="punctuation">}</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">var</span> output <span class="operator">=</span> <span class="punctuation">[</span><span class="punctuation">]</span><span class="punctuation">;</span>
<span class="keyword">for</span> <span class="punctuation">(</span><span class="keyword">var</span> i <span class="operator">=</span> <span class="number">0</span><span class="punctuation">;</span> i <span class="operator">&lt;</span> numRolls<span class="punctuation">;</span> i<span class="operator">++</span><span class="punctuation">)</span> <span class="punctuation">{</span>
output<span class="punctuation">.</span><span class="function">push</span><span class="punctuation">(</span><span class="keyword">this</span><span class="punctuation">.</span><span class="function">rollOnce</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="keyword">return</span> output<span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">var</span> root <span class="operator">=</span> <span class="punctuation">{</span>
getDie<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>numSides<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">return</span> <span class="keyword">new</span> <span class="class-name">RandomDie</span><span class="punctuation">(</span>numSides <span class="operator">||</span> <span class="number">6</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>For fields that don&apos;t use any arguments, you can use either properties on the object or instance methods. So for the example code above, both <code>numSides</code> and <code>rollOnce</code> can actually be used to implement GraphQL fields, so that code also implements the schema of:</p><pre class="prism language-javascript">type RandomDie <span class="punctuation">{</span>
numSides<span class="punctuation">:</span> Int<span class="operator">!</span>
rollOnce<span class="punctuation">:</span> Int<span class="operator">!</span>
<span class="function">roll</span><span class="punctuation">(</span>numRolls<span class="punctuation">:</span> Int<span class="operator">!</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="punctuation">[</span>Int<span class="punctuation">]</span>
<span class="punctuation">}</span>

type Query <span class="punctuation">{</span>
<span class="function">getDie</span><span class="punctuation">(</span>numSides<span class="punctuation">:</span> Int<span class="punctuation">)</span><span class="punctuation">:</span> RandomDie
<span class="punctuation">}</span></pre><p>Putting this all together, here is some sample code that runs a server with this GraphQL API:</p><pre class="prism language-javascript"><span class="keyword">var</span> express <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> graphqlHTTP <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express-graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> <span class="punctuation">{</span> buildSchema <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// Construct a schema, using GraphQL schema language</span>
<span class="keyword">var</span> schema <span class="operator">=</span> <span class="function">buildSchema</span><span class="punctuation">(</span><span class="template-string"><span class="string">`
type RandomDie {
numSides: Int!
rollOnce: Int!
roll(numRolls: Int!): [Int]
}

type Query {
getDie(numSides: Int): RandomDie
}
`</span></span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// This class implements the RandomDie GraphQL type</span>
<span class="keyword">class</span> <span class="class-name">RandomDie</span> <span class="punctuation">{</span>
<span class="function">constructor</span><span class="punctuation">(</span>numSides<span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">this</span><span class="punctuation">.</span>numSides <span class="operator">=</span> numSides<span class="punctuation">;</span>
<span class="punctuation">}</span>

<span class="function">rollOnce</span><span class="punctuation">(</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">return</span> <span class="number">1</span> <span class="operator">+</span> Math<span class="punctuation">.</span><span class="function">floor</span><span class="punctuation">(</span>Math<span class="punctuation">.</span><span class="function">random</span><span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">\*</span> <span class="keyword">this</span><span class="punctuation">.</span>numSides<span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>

<span class="function">roll</span><span class="punctuation">(</span><span class="punctuation">{</span>numRolls<span class="punctuation">}</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">var</span> output <span class="operator">=</span> <span class="punctuation">[</span><span class="punctuation">]</span><span class="punctuation">;</span>
<span class="keyword">for</span> <span class="punctuation">(</span><span class="keyword">var</span> i <span class="operator">=</span> <span class="number">0</span><span class="punctuation">;</span> i <span class="operator">&lt;</span> numRolls<span class="punctuation">;</span> i<span class="operator">++</span><span class="punctuation">)</span> <span class="punctuation">{</span>
output<span class="punctuation">.</span><span class="function">push</span><span class="punctuation">(</span><span class="keyword">this</span><span class="punctuation">.</span><span class="function">rollOnce</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="keyword">return</span> output<span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>

<span spellcheck="true" class="comment">// The root provides the top-level API endpoints</span>
<span class="keyword">var</span> root <span class="operator">=</span> <span class="punctuation">{</span>
getDie<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>numSides<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">return</span> <span class="keyword">new</span> <span class="class-name">RandomDie</span><span class="punctuation">(</span>numSides <span class="operator">||</span> <span class="number">6</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>

<span class="keyword">var</span> app <span class="operator">=</span> <span class="function">express</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">use</span><span class="punctuation">(</span><span class="string">&apos;/graphql&apos;</span><span class="punctuation">,</span> <span class="function">graphqlHTTP</span><span class="punctuation">(</span><span class="punctuation">{</span>
schema<span class="punctuation">:</span> schema<span class="punctuation">,</span>
rootValue<span class="punctuation">:</span> root<span class="punctuation">,</span>
graphiql<span class="punctuation">:</span> <span class="keyword">true</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">listen</span><span class="punctuation">(</span><span class="number">4000</span><span class="punctuation">)</span><span class="punctuation">;</span>
console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">&apos;Running a GraphQL API server at localhost:4000/graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span></pre><p>When you issue a GraphQL query against an API that returns object types, you can call multiple methods on the object at once by nesting the GraphQL field names. For example, if you wanted to call both <code>rollOnce</code> to roll a die once, and <code>roll</code> to roll a die three times, you could do it with this query:</p><pre class="prism language-javascript"><span class="punctuation">{</span>
<span class="function">getDie</span><span class="punctuation">(</span>numSides<span class="punctuation">:</span> <span class="number">6</span><span class="punctuation">)</span> <span class="punctuation">{</span>
rollOnce
<span class="function">roll</span><span class="punctuation">(</span>numRolls<span class="punctuation">:</span> <span class="number">3</span><span class="punctuation">)</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>If you run this code with <code>node server.js</code> and browse to <a href="http://localhost:4000/graphql">http://localhost:4000/graphql</a> you can try out these APIs with GraphiQL.</p><p>This way of defining object types often provides advantages over a traditional REST API. Instead of doing one API request to get basic information about an object, and then multiple subsequent API requests to find out more information about that object, you can get all of that information in one API request. That saves bandwidth, makes your app run faster, and simplifies your client-side logic.</p><p>So far, every API we&apos;ve looked at is designed for returning data. In order to modify stored data or handle complex input, it helps to <a href="/graphql-js/mutations-and-input-types/">learn about mutations and input types</a>.</p></div>
