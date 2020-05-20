<h1>graphql/utilities</h1><div><p>The <code>graphql/utilities</code> module contains common useful computations to use with
the GraphQL language and type objects. You can import either from the <code>graphql/utilities</code> module, or from the root <code>graphql</code> module. For example:</p><pre class="prism language-js"><span class="keyword">import</span> <span class="punctuation">{</span> introspectionQuery <span class="punctuation">}</span> <span class="keyword">from</span> <span class="string">&apos;graphql&apos;</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// ES6</span>
<span class="keyword">var</span> <span class="punctuation">{</span> introspectionQuery <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// CommonJS</span></pre><h2><a class="anchor" name="overview"></a>Overview <a class="hash-link" href="#overview">#</a></h2><p><em>Introspection</em></p><div><ul class="apiIndex">
  <li>
    <a href="#introspectionquery">
      <pre>var introspectionQuery</pre>
      A GraphQL introspection query containing enough information to reproduce a type system.
    </a>
  </li>
  <li>
    <a href="#buildclientschema">
      <pre>function buildClientSchema</pre>
      Produces a client schema given the result of querying a schema with `introspectionQuery`.
    </a>
  </li>
</ul>

</div><p><em>Schema Language</em></p><div><ul class="apiIndex">
  <li>
    <a href="#buildschema">
      <pre>function buildSchema</pre>
      Builds a Schema object from GraphQL schema language.
    </a>
  </li>
  <li>
    <a href="#printschema">
      <pre>function printSchema</pre>
      Prints the schema in a standard format.
    </a>
  </li>
  <li>
    <a href="#printintrospectionschema">
      <pre>function printIntrospectionSchema</pre>
      Prints the introspection features of the schema in a standard format.
    </a>
  </li>
  <li>
    <a href="#buildastschema">
      <pre>function buildASTSchema</pre>
      Builds a schema from a parsed AST Schema.
    </a>
  </li>
  <li>
    <a href="#typefromast">
      <pre>function typeFromAST</pre>
      Looks up a type referenced in an AST in the GraphQLSchema.
    </a>
  </li>
  <li>
    <a href="#astfromvalue">
      <pre>function astFromValue</pre>
      Produces a GraphQL Input Value AST given a JavaScript value.
    </a>
  </li>
</ul>

</div><p><em>Visitors</em></p><div><ul class="apiIndex">
  <li>
    <a href="#typeinfo">
      <pre>class TypeInfo</pre>
      Tracks type and field definitions during a visitor AST traversal..
    </a>
  </li>
</ul>

</div><p><em>Value Validation</em></p><div><ul class="apiIndex">
  <li>
    <a href="#isvalidjsvalue">
      <pre>function isValidJSValue</pre>
      Determines if a JavaScript value is valid for a GraphQL type.
    </a>
  </li>
  <li>
    <a href="#isvalidliteralvalue">
      <pre>function isValidLiteralValue</pre>
      Determines if a literal value from an AST is valid for a GraphQL type.
    </a>
  </li>
</ul>

</div><h2><a class="anchor" name="introspection"></a>Introspection <a class="hash-link" href="#introspection">#</a></h2><h3><a class="anchor" name="introspectionquery"></a>introspectionQuery <a class="hash-link" href="#introspectionquery">#</a></h3><pre class="prism language-js"><span class="keyword">var</span> introspectionQuery<span class="punctuation">:</span> string</pre><p>A GraphQL query that queries a server&apos;s introspection system for enough
information to reproduce that server&apos;s type system.</p><h3><a class="anchor" name="buildclientschema"></a>buildClientSchema <a class="hash-link" href="#buildclientschema">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">buildClientSchema</span><span class="punctuation">(</span>
  introspection<span class="punctuation">:</span> IntrospectionQuery
<span class="punctuation">)</span><span class="punctuation">:</span> GraphQLSchema</pre><p>Build a GraphQLSchema for use by client tools.</p><p>Given the result of a client running the introspection query, creates and
returns a GraphQLSchema instance which can be then used with all GraphQL.js
tools, but cannot be used to execute a query, as introspection does not
represent the &quot;resolver&quot;, &quot;parse&quot; or &quot;serialize&quot; functions or any other
server-internal mechanisms.</p><h2><a class="anchor" name="schema-representation"></a>Schema Representation <a class="hash-link" href="#schema-representation">#</a></h2><h3><a class="anchor" name="buildschema"></a>buildSchema <a class="hash-link" href="#buildschema">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">buildSchema</span><span class="punctuation">(</span>source<span class="punctuation">:</span> string <span class="operator">|</span> Source<span class="punctuation">)</span><span class="punctuation">:</span> GraphQLSchema <span class="punctuation">{</span></pre><p>Creates a GraphQLSchema object from GraphQL schema language. The schema will use default resolvers. For more detail on the GraphQL schema language, see the <a href="/learn/schema/">schema language docs</a> or this <a href="https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6#.9oztv0a7n" target="_blank" rel="nofollow noopener noreferrer">schema language cheat sheet</a>.</p><h3><a class="anchor" name="printschema"></a>printSchema <a class="hash-link" href="#printschema">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">printSchema</span><span class="punctuation">(</span>schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">)</span><span class="punctuation">:</span> string <span class="punctuation">{</span></pre><p>Prints the provided schema in the Schema Language format.</p><h3><a class="anchor" name="printintrospectionschema"></a>printIntrospectionSchema <a class="hash-link" href="#printintrospectionschema">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">printIntrospectionSchema</span><span class="punctuation">(</span>schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">)</span><span class="punctuation">:</span> string <span class="punctuation">{</span></pre><p>Prints the built-in introspection schema in the Schema Language format.</p><h3><a class="anchor" name="buildastschema"></a>buildASTSchema <a class="hash-link" href="#buildastschema">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">buildASTSchema</span><span class="punctuation">(</span>
  ast<span class="punctuation">:</span> SchemaDocument<span class="punctuation">,</span>
  queryTypeName<span class="punctuation">:</span> string<span class="punctuation">,</span>
  mutationTypeName<span class="punctuation">:</span> <span class="operator">?</span>string
<span class="punctuation">)</span><span class="punctuation">:</span> GraphQLSchema</pre><p>This takes the ast of a schema document produced by <code>parseSchemaIntoAST</code> in
<code>graphql/language/schema</code> and constructs a GraphQLSchema instance which can be
then used with all GraphQL.js tools, but cannot be used to execute a query, as
introspection does not represent the &quot;resolver&quot;, &quot;parse&quot; or &quot;serialize&quot;
functions or any other server-internal mechanisms.</p><h3><a class="anchor" name="typefromast"></a>typeFromAST <a class="hash-link" href="#typefromast">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">typeFromAST</span><span class="punctuation">(</span>
  schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">,</span>
  inputTypeAST<span class="punctuation">:</span> Type
<span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLType</pre><p>Given the name of a Type as it appears in a GraphQL AST and a Schema, return the
corresponding GraphQLType from that schema.</p><h3><a class="anchor" name="astfromvalue"></a>astFromValue <a class="hash-link" href="#astfromvalue">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">astFromValue</span><span class="punctuation">(</span>
  value<span class="punctuation">:</span> any<span class="punctuation">,</span>
  type<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLType
<span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>Value</pre><p>Produces a GraphQL Input Value AST given a JavaScript value.</p><p>Optionally, a GraphQL type may be provided, which will be used to
disambiguate between value primitives.</p><h2><a class="anchor" name="visitors"></a>Visitors <a class="hash-link" href="#visitors">#</a></h2><h3><a class="anchor" name="typeinfo"></a>TypeInfo <a class="hash-link" href="#typeinfo">#</a></h3><pre class="prism language-js"><span class="keyword">class</span> <span class="class-name">TypeInfo</span> <span class="punctuation">{</span>
  <span class="function">constructor</span><span class="punctuation">(</span>schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">)</span>
  <span class="function">getType</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLOutputType <span class="punctuation">{</span>
  <span class="function">getParentType</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLCompositeType <span class="punctuation">{</span>
  <span class="function">getInputType</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLInputType <span class="punctuation">{</span>
  <span class="function">getFieldDef</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLFieldDefinition <span class="punctuation">{</span>
  <span class="function">getDirective</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLDirective <span class="punctuation">{</span>
  <span class="function">getArgument</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">:</span> <span class="operator">?</span>GraphQLArgument <span class="punctuation">{</span>
<span class="punctuation">}</span></pre><p>TypeInfo is a utility class which, given a GraphQL schema, can keep track
of the current field and type definitions at any point in a GraphQL document
AST during a recursive descent by calling <code>enter(node)</code> and <code>leave(node)</code>.</p><h2><a class="anchor" name="value-validation"></a>Value Validation <a class="hash-link" href="#value-validation">#</a></h2><h3><a class="anchor" name="isvalidjsvalue"></a>isValidJSValue <a class="hash-link" href="#isvalidjsvalue">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">isValidJSValue</span><span class="punctuation">(</span>value<span class="punctuation">:</span> any<span class="punctuation">,</span> type<span class="punctuation">:</span> GraphQLInputType<span class="punctuation">)</span><span class="punctuation">:</span> string<span class="punctuation">[</span><span class="punctuation">]</span></pre><p>Given a JavaScript value and a GraphQL type, determine if the value will be
accepted for that type. This is primarily useful for validating the
runtime values of query variables.</p><h3><a class="anchor" name="isvalidliteralvalue"></a>isValidLiteralValue <a class="hash-link" href="#isvalidliteralvalue">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">isValidLiteralValue</span><span class="punctuation">(</span>
  type<span class="punctuation">:</span> GraphQLInputType<span class="punctuation">,</span>
  valueAST<span class="punctuation">:</span> Value
<span class="punctuation">)</span><span class="punctuation">:</span> string<span class="punctuation">[</span><span class="punctuation">]</span></pre><p>Utility for validators which determines if a value literal AST is valid given
an input type.</p><p>Note that this only validates literal values, variables are assumed to
provide values of the correct type.</p></div>
