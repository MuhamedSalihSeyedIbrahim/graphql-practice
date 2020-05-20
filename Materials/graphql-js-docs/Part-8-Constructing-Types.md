<h1>Constructing Types</h1><div><p>For many apps, you can define a fixed schema when the application starts, and define it using GraphQL schema language. In some cases, it&apos;s useful to construct a schema programmatically. You can do this using the <code>GraphQLSchema</code> constructor.</p><p>When you are using the <code>GraphQLSchema</code> constructor to create a schema, instead of defining <code>Query</code> and <code>Mutation</code> types solely using schema language, you create them as separate object types.</p><p>For example, let&apos;s say we are building a simple API that lets you fetch user data for a few hardcoded users based on an id. Using <code>buildSchema</code> we could write a server with:</p><pre class="prism language-javascript"><span class="keyword">var</span> express <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> graphqlHTTP <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express-graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> <span class="punctuation">{</span> buildSchema <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span class="keyword">var</span> schema <span class="operator">=</span> <span class="function">buildSchema</span><span class="punctuation">(</span><span class="template-string"><span class="string">`
type User {
id: String
name: String
}

type Query {
user(id: String): User
}
`</span></span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// Maps id to User object</span>
<span class="keyword">var</span> fakeDatabase <span class="operator">=</span> <span class="punctuation">{</span>
<span class="string">&apos;a&apos;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
id<span class="punctuation">:</span> <span class="string">&apos;a&apos;</span><span class="punctuation">,</span>
name<span class="punctuation">:</span> <span class="string">&apos;alice&apos;</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="string">&apos;b&apos;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
id<span class="punctuation">:</span> <span class="string">&apos;b&apos;</span><span class="punctuation">,</span>
name<span class="punctuation">:</span> <span class="string">&apos;bob&apos;</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">;</span>

<span class="keyword">var</span> root <span class="operator">=</span> <span class="punctuation">{</span>
user<span class="punctuation">:</span> <span class="punctuation">(</span><span class="punctuation">{</span>id<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">return</span> fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">;</span>

<span class="keyword">var</span> app <span class="operator">=</span> <span class="function">express</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">use</span><span class="punctuation">(</span><span class="string">&apos;/graphql&apos;</span><span class="punctuation">,</span> <span class="function">graphqlHTTP</span><span class="punctuation">(</span><span class="punctuation">{</span>
schema<span class="punctuation">:</span> schema<span class="punctuation">,</span>
rootValue<span class="punctuation">:</span> root<span class="punctuation">,</span>
graphiql<span class="punctuation">:</span> <span class="keyword">true</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">listen</span><span class="punctuation">(</span><span class="number">4000</span><span class="punctuation">)</span><span class="punctuation">;</span>
console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">&apos;Running a GraphQL API server at localhost:4000/graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span></pre><p>We can implement this same API without using GraphQL schema language:</p><pre class="prism language-javascript"><span class="keyword">var</span> express <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> graphqlHTTP <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;express-graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="keyword">var</span> graphql <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// Maps id to User object</span>
<span class="keyword">var</span> fakeDatabase <span class="operator">=</span> <span class="punctuation">{</span>
<span class="string">&apos;a&apos;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
id<span class="punctuation">:</span> <span class="string">&apos;a&apos;</span><span class="punctuation">,</span>
name<span class="punctuation">:</span> <span class="string">&apos;alice&apos;</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="string">&apos;b&apos;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
id<span class="punctuation">:</span> <span class="string">&apos;b&apos;</span><span class="punctuation">,</span>
name<span class="punctuation">:</span> <span class="string">&apos;bob&apos;</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// Define the User type</span>
<span class="keyword">var</span> userType <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">graphql<span class="punctuation">.</span>GraphQLObjectType</span><span class="punctuation">(</span><span class="punctuation">{</span>
name<span class="punctuation">:</span> <span class="string">&apos;User&apos;</span><span class="punctuation">,</span>
fields<span class="punctuation">:</span> <span class="punctuation">{</span>
id<span class="punctuation">:</span> <span class="punctuation">{</span> type<span class="punctuation">:</span> graphql<span class="punctuation">.</span>GraphQLString <span class="punctuation">}</span><span class="punctuation">,</span>
name<span class="punctuation">:</span> <span class="punctuation">{</span> type<span class="punctuation">:</span> graphql<span class="punctuation">.</span>GraphQLString <span class="punctuation">}</span><span class="punctuation">,</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span spellcheck="true" class="comment">// Define the Query type</span>
<span class="keyword">var</span> queryType <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">graphql<span class="punctuation">.</span>GraphQLObjectType</span><span class="punctuation">(</span><span class="punctuation">{</span>
name<span class="punctuation">:</span> <span class="string">&apos;Query&apos;</span><span class="punctuation">,</span>
fields<span class="punctuation">:</span> <span class="punctuation">{</span>
user<span class="punctuation">:</span> <span class="punctuation">{</span>
type<span class="punctuation">:</span> userType<span class="punctuation">,</span>
<span spellcheck="true" class="comment">// `args` describes the arguments that the `user` query accepts</span>
args<span class="punctuation">:</span> <span class="punctuation">{</span>
id<span class="punctuation">:</span> <span class="punctuation">{</span> type<span class="punctuation">:</span> graphql<span class="punctuation">.</span>GraphQLString <span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
resolve<span class="punctuation">:</span> <span class="punctuation">(</span>\_<span class="punctuation">,</span> <span class="punctuation">{</span>id<span class="punctuation">}</span><span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> <span class="punctuation">{</span>
<span class="keyword">return</span> fakeDatabase<span class="punctuation">[</span>id<span class="punctuation">]</span><span class="punctuation">;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span class="keyword">var</span> schema <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">graphql<span class="punctuation">.</span>GraphQLSchema</span><span class="punctuation">(</span><span class="punctuation">{</span>query<span class="punctuation">:</span> queryType<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">;</span>

<span class="keyword">var</span> app <span class="operator">=</span> <span class="function">express</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">use</span><span class="punctuation">(</span><span class="string">&apos;/graphql&apos;</span><span class="punctuation">,</span> <span class="function">graphqlHTTP</span><span class="punctuation">(</span><span class="punctuation">{</span>
schema<span class="punctuation">:</span> schema<span class="punctuation">,</span>
graphiql<span class="punctuation">:</span> <span class="keyword">true</span><span class="punctuation">,</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">)</span><span class="punctuation">;</span>
app<span class="punctuation">.</span><span class="function">listen</span><span class="punctuation">(</span><span class="number">4000</span><span class="punctuation">)</span><span class="punctuation">;</span>
console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">&apos;Running a GraphQL API server at localhost:4000/graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span></pre><p>When we use this method of creating the API, the root level resolvers are implemented on the <code>Query</code> and <code>Mutation</code> types rather than on a <code>root</code> object.</p><p>This is particularly useful if you want to create a GraphQL schema automatically from something else, like a database schema. You might have a common format for something like creating and updating database records. This is also useful for implementing features like union types which don&apos;t map cleanly to ES6 classes and schema language.</p></div>
