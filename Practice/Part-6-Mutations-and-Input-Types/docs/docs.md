<h1>Mutations and Input Types</h1><div><p>If you have an API endpoint that alters data, like inserting data into a database or altering data already in a database, you should make this endpoint a <code>Mutation</code> rather than a <code>Query</code>. This is as simple as making the API endpoint part of the top-level <code>Mutation</code> type instead of the top-level <code>Query</code> type.</p><p>Let&apos;s say we have a &#x201C;message of the day&#x201D; server, where anyone can update the message of the day, and anyone can read the current one. The GraphQL schema for this is simply:</p><pre class="prism language-javascript">type Mutation <span class="punctuation">{</span>
  <span class="function">setMessage</span><span class="punctuation">(</span>message<span class="punctuation">:</span> String<span class="punctuation">)</span><span class="punctuation">:</span> String
<span class="punctuation">}</span>

type Query <span class="punctuation">{</span>
getMessage<span class="punctuation">:</span> String
<span class="punctuation">}</span></pre><p>It&apos;s often convenient to have a mutation that maps to a database create or update operation, like <code>setMessage</code>, return the same thing that the server stored. That way, if you modify the data on the server, the client can learn about those modifications.</p><p>Both mutations and queries can be handled by root resolvers, so the root that implements this schema can simply be:</p><pre class="prism language-javascript"><span class="keyword">var</span> fakeDatabase <span class="operator">=</span> <span class="punctuation">{</span><span class="punctuation">}</span><span class="punctuation">;</span>
<span class="keyword">var</span> root <span class="operator">=</span> <span class="punctuation">{</span>
setMessage<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>message<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
fakeDatabase<span class="punctuation">.</span>message <span class="operator">=</span> message<span class="punctuation">;</span>
<span class="keyword">return</span> message<span class="punctuation">;</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
getMessage<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">return</span> fakeDatabase<span class="punctuation">.</span>message<span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">;</span></pre><p>You don&apos;t need anything more than this to implement mutations. But in many cases, you will find a number of different mutations that all accept the same input parameters. A common example is that creating an object in a database and updating an object in a database often take the same parameters. To make your schema simpler, you can use &#x201C;input types&#x201D; for this, by using the <code>input</code> keyword instead of the <code>type</code> keyword.</p><p>For example, instead of a single message of the day, let&apos;s say we have many messages, indexed in a database by the <code>id</code> field, and each message has both a <code>content</code> string and an <code>author</code> string. We want a mutation API both for creating a new message and for updating an old message. We could use the schema:</p><pre class="prism language-javascript">input MessageInput <span class="punctuation">{</span>
content<span class="punctuation">:</span> String
author<span class="punctuation">:</span> String
<span class="punctuation">}</span>

type Message <span class="punctuation">{</span>
id<span class="punctuation">:</span> ID<span class="operator">!</span>
content<span class="punctuation">:</span> String
author<span class="punctuation">:</span> String
<span class="punctuation">}</span>

type Query <span class="punctuation">{</span>
<span class="function">getMessage</span><span class="punctuation">(</span>id<span class="punctuation">:</span> ID<span class="operator">!</span><span class="punctuation">)</span><span class="punctuation">:</span> Message
<span class="punctuation">}</span>

type Mutation <span class="punctuation">{</span>
<span class="function">createMessage</span><span class="punctuation">(</span>input<span class="punctuation">:</span> MessageInput<span class="punctuation">)</span><span class="punctuation">:</span> Message
<span class="function">updateMessage</span><span class="punctuation">(</span>id<span class="punctuation">:</span> ID<span class="operator">!</span><span class="punctuation">,</span> input<span class="punctuation">:</span> MessageInput<span class="punctuation">)</span><span class="punctuation">:</span> Message
<span class="punctuation">}</span></pre><p>Here, the mutations return a <code>Message</code> type, so that the client can get more information about the newly-modified <code>Message</code> in the same request as the request that mutates it.</p><p>Input types can&apos;t have fields that are other objects, only basic scalar types, list types, and other input types.</p><p>Naming input types with <code>Input</code> on the end is a useful convention, because you will often want both an input type and an output type that are slightly different for a single conceptual object.</p><p>Here&apos;s some runnable code that implements this schema, keeping the data in memory:</p><pre class="prism language-javascript"><span class="keyword">var</span> express <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> graphqlHTTP <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express-graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> <span class="punctuation">{</span> buildSchema <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// Construct a schema, using GraphQL schema language</span>
<span class="keyword">var</span> schema <span class="operator">=</span> <span class="function">buildSchema</span><span class="punctuation">(</span><span class="template-string"><span class="string">`
input MessageInput {
content: String
author: String
}

type Message {
id: ID!
content: String
author: String
}

type Query {
getMessage(id: ID!): Message
}

type Mutation {
createMessage(input: MessageInput): Message
updateMessage(id: ID!, input: MessageInput): Message
}
`</span></span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// If Message had any complex fields, we&apos;d put them on this object.</span>
<span class="keyword">class</span> <span class="class-name">Message</span> <span class="punctuation">{</span>
<span class="function">constructor</span><span class="punctuation">(</span>id<span class="punctuation">,</span> <span class="punctuation">{</span>content<span class="punctuation">,</span> author<span class="punctuation">}</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">this</span><span class="punctuation">.</span>id <span class="operator">=</span> id<span class="punctuation">;</span>
<span class="keyword">this</span><span class="punctuation">.</span>content <span class="operator">=</span> content<span class="punctuation">;</span>
<span class="keyword">this</span><span class="punctuation">.</span>author <span class="operator">=</span> author<span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>

<span spellcheck="true" class="comment">// Maps username to content</span>
<span class="keyword">var</span> fakeDatabase <span class="operator">=</span> <span class="punctuation">{</span><span class="punctuation">}</span><span class="punctuation">;</span>

<span class="keyword">var</span> root <span class="operator">=</span> <span class="punctuation">{</span>
getMessage<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>id<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">if</span> <span class="punctuation">(</span><span class="operator">!</span>fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">throw</span> <span class="keyword">new</span> <span class="class-name">Error</span><span class="punctuation">(</span><span class="string">&apos;no message exists with id &apos;</span> <span class="operator">+</span> id<span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="keyword">return</span> <span class="keyword">new</span> <span class="class-name">Message</span><span class="punctuation">(</span>id<span class="punctuation">,</span> fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
createMessage<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>input<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// Create a random id for our &quot;database&quot;.</span>
<span class="keyword">var</span> id <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;crypto&apos;</span><span class="punctuation">)</span><span class="punctuation">.</span><span class="function">randomBytes</span><span class="punctuation">(</span><span class="number">10</span><span class="punctuation">)</span><span class="punctuation">.</span><span class="function">toString</span><span class="punctuation">(</span><span class="string">&apos;hex&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>

    fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span> <span class="operator">=</span> input<span class="punctuation">;</span>
    <span class="keyword">return</span> <span class="keyword">new</span> <span class="class-name">Message</span><span class="punctuation">(</span>id<span class="punctuation">,</span> input<span class="punctuation">)</span><span class="punctuation">;</span>

<span class="punctuation">}</span><span class="punctuation">,</span>
updateMessage<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>id<span class="punctuation">,</span> input<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">if</span> <span class="punctuation">(</span><span class="operator">!</span>fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span><span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">throw</span> <span class="keyword">new</span> <span class="class-name">Error</span><span class="punctuation">(</span><span class="string">&apos;no message exists with id &apos;</span> <span class="operator">+</span> id<span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span spellcheck="true" class="comment">// This replaces all old data, but some apps might want partial update.</span>
fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span> <span class="operator">=</span> input<span class="punctuation">;</span>
<span class="keyword">return</span> <span class="keyword">new</span> <span class="class-name">Message</span><span class="punctuation">(</span>id<span class="punctuation">,</span> input<span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">;</span>

<span class="keyword">var</span> app <span class="operator">=</span> <span class="function">express</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">use</span><span class="punctuation">(</span><span class="string">&apos;/graphql&apos;</span><span class="punctuation">,</span> <span class="function">graphqlHTTP</span><span class="punctuation">(</span><span class="punctuation">{</span>
schema<span class="punctuation">:</span> schema<span class="punctuation">,</span>
rootValue<span class="punctuation">:</span> root<span class="punctuation">,</span>
graphiql<span class="punctuation">:</span> <span class="keyword">true</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">listen</span><span class="punctuation">(</span><span class="number">4000</span><span class="punctuation">,</span> <span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">&apos;Running a GraphQL API server at localhost:4000/graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">;</span></pre><p>To call a mutation, you must use the keyword <code>mutation</code> before your GraphQL query. To pass an input type, provide the data written as if it&apos;s a JSON object. For example, with the server defined above, you can create a new message and return the <code>id</code> of the new message with this operation:</p><pre class="prism language-javascript">mutation <span class="punctuation">{</span>
<span class="function">createMessage</span><span class="punctuation">(</span>input<span class="punctuation">:</span> <span class="punctuation">{</span>
author<span class="punctuation">:</span> <span class="string">&quot;andy&quot;</span><span class="punctuation">,</span>
content<span class="punctuation">:</span> <span class="string">&quot;hope is a good thing&quot;</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">)</span> <span class="punctuation">{</span>
id
<span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>You can use variables to simplify mutation client logic just like you can with queries. For example, some JavaScript code that calls the server to execute this mutation is:</p><pre class="prism language-javascript"><span class="keyword">var</span> author <span class="operator">=</span> <span class="string">&apos;andy&apos;</span><span class="punctuation">;</span>
<span class="keyword">var</span> content <span class="operator">=</span> <span class="string">&apos;hope is a good thing&apos;</span><span class="punctuation">;</span>
<span class="keyword">var</span> query <span class="operator">=</span> <span class="template-string"><span class="string">`mutation CreateMessage($input: MessageInput) { createMessage(input: $input) { id } }`</span></span><span class="punctuation">;</span>

<span class="function">fetch</span><span class="punctuation">(</span><span class="string">&apos;/graphql&apos;</span><span class="punctuation">,</span> <span class="punctuation">{</span>
method<span class="punctuation">:</span> <span class="string">&apos;POST&apos;</span><span class="punctuation">,</span>
headers<span class="punctuation">:</span> <span class="punctuation">{</span>
<span class="string">&apos;Content-Type&apos;</span><span class="punctuation">:</span> <span class="string">&apos;application/json&apos;</span><span class="punctuation">,</span>
<span class="string">&apos;Accept&apos;</span><span class="punctuation">:</span> <span class="string">&apos;application/json&apos;</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
body<span class="punctuation">:</span> JSON<span class="punctuation">.</span><span class="function">stringify</span><span class="punctuation">(</span><span class="punctuation">{</span>
query<span class="punctuation">,</span>
variables<span class="punctuation">:</span> <span class="punctuation">{</span>
input<span class="punctuation">:</span> <span class="punctuation">{</span>
author<span class="punctuation">,</span>
content<span class="punctuation">,</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span>
<span class="punctuation">}</span><span class="punctuation">)</span>
<span class="punctuation">.</span><span class="function">then</span><span class="punctuation">(</span>r <span class="operator">=</span><span class="operator">&gt;</span> r<span class="punctuation">.</span><span class="function">json</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">)</span>
<span class="punctuation">.</span><span class="function">then</span><span class="punctuation">(</span>data <span class="operator">=</span><span class="operator">&gt;</span> console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">&apos;data returned:&apos;</span><span class="punctuation">,</span> data<span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span></pre><p>One particular type of mutation is operations that change users, like signing up a new user. While you can implement this using GraphQL mutations, you can reuse many existing libraries if you learn about <a href="/graphql-js/authentication-and-express-middleware/">GraphQL with authentication and Express middleware</a>.</p></div>
