<h1>graphql</h1><div><p>The <code>graphql</code> module exports a core subset of GraphQL functionality for creation
of GraphQL type systems and servers.</p><pre class="prism language-js"><span class="keyword">import</span> <span class="punctuation">{</span> graphql <span class="punctuation">}</span> <span class="keyword">from</span> <span class="string">&apos;graphql&apos;</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// ES6</span>
<span class="keyword">var</span> <span class="punctuation">{</span> graphql <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// CommonJS</span></pre><h2><a class="anchor" name="overview"></a>Overview <a class="hash-link" href="#overview">#</a></h2><p><em>Entry Point</em></p><div><ul class="apiIndex">
  <li>
    <a href="#graphql">
      <pre>function graphql</pre>
      Lexes, parses, validates, and executes a GraphQL request on a schema.
    </a>
  </li>
</ul>

</div><p><em>Schema</em></p><div><ul class="apiIndex">
  <li>
    <a href="../type/#graphqlschema">
      <pre>class GraphQLSchema</pre>
      A representation of the capabilities of a GraphQL Server.
    </a>
  </li>
</ul>

</div><p><em>Type Definitions</em></p><div><ul class="apiIndex">
  <li>
    <a href="../type/#graphqlscalartype">
      <pre>class GraphQLScalarType</pre>
      A scalar type within GraphQL.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlobjecttype">
      <pre>class GraphQLObjectType</pre>
      An object type within GraphQL that contains fields.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlinterfacetype">
      <pre>class GraphQLInterfaceType</pre>
      An interface type within GraphQL that defines fields implementations will contain.
    </a>
  </li>
  <li>
    <a href="../type/#graphqluniontype">
      <pre>class GraphQLUnionType</pre>
      A union type within GraphQL that defines a list of implementations.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlenumtype">
      <pre>class GraphQLEnumType</pre>
      An enum type within GraphQL that defines a list of valid values.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlinputobjecttype">
      <pre>class GraphQLInputObjectType</pre>
      An input object type within GraphQL that represents structured inputs.
    </a>
  </li>
  <li>
    <a href="../type/#graphqllist">
      <pre>class GraphQLList</pre>
      A type wrapper around other types that represents a list of those types.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlnonnull">
      <pre>class GraphQLNonNull</pre>
      A type wrapper around other types that represents a non-null version of those types.
    </a>
  </li>
</ul>

</div><p><em>Scalars</em></p><div><ul class="apiIndex">
  <li>
    <a href="../type/#graphqlint">
      <pre>var GraphQLInt</pre>
      A scalar type representing integers.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlfloat">
      <pre>var GraphQLFloat</pre>
      A scalar type representing floats.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlstring">
      <pre>var GraphQLString</pre>
      A scalar type representing strings.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlboolean">
      <pre>var GraphQLBoolean</pre>
      A scalar type representing booleans.
    </a>
  </li>
  <li>
    <a href="../type/#graphqlid">
      <pre>var GraphQLID</pre>
      A scalar type representing IDs.
    </a>
  </li>
</ul>

</div><p><em>Errors</em></p><div><ul class="apiIndex">
  <li>
    <a href="../error/#formaterror">
      <pre>function formatError</pre>
      Format an error according to the rules described by the Response Format.
    </a>
  </li>
</ul>

</div><h2><a class="anchor" name="entry-point"></a>Entry Point <a class="hash-link" href="#entry-point">#</a></h2><h3><a class="anchor" name="graphql"></a>graphql <a class="hash-link" href="#graphql">#</a></h3><pre class="prism language-js"><span class="function">graphql</span><span class="punctuation">(</span>
  schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">,</span>
  requestString<span class="punctuation">:</span> string<span class="punctuation">,</span>
  rootValue<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>any<span class="punctuation">,</span>
  contextValue<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>any<span class="punctuation">,</span>
  variableValues<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span><span class="punctuation">{</span><span class="punctuation">[</span>key<span class="punctuation">:</span> string<span class="punctuation">]</span><span class="punctuation">:</span> any<span class="punctuation">}</span><span class="punctuation">,</span>
  operationName<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>string
<span class="punctuation">)</span><span class="punctuation">:</span> Promise<span class="operator">&lt;</span>GraphQLResult<span class="operator">&gt;</span></pre><p>The <code>graphql</code> function lexes, parses, validates and executes a GraphQL request.
It requires a <code>schema</code> and a <code>requestString</code>. Optional arguments include a
<code>rootValue</code>, which will get passed as the root value to the executor, a <code>contextValue</code>,
which will get passed to all resolve functions,
<code>variableValues</code>, which will get passed to the executor to provide values for
any variables in <code>requestString</code>, and <code>operationName</code>, which allows the caller
to specify which operation in <code>requestString</code> will be run, in cases where
<code>requestString</code> contains multiple top-level operations.</p><h2><a class="anchor" name="schema"></a>Schema <a class="hash-link" href="#schema">#</a></h2><p>See the <a href="../type#schema" target="_blank" rel="nofollow noopener noreferrer">Type System API Reference</a>.</p><h2><a class="anchor" name="type-definitions"></a>Type Definitions <a class="hash-link" href="#type-definitions">#</a></h2><p>See the <a href="../type#definitions" target="_blank" rel="nofollow noopener noreferrer">Type System API Reference</a>.</p><h2><a class="anchor" name="scalars"></a>Scalars <a class="hash-link" href="#scalars">#</a></h2><p>See the <a href="../type#scalars" target="_blank" rel="nofollow noopener noreferrer">Type System API Reference</a>.</p><h2><a class="anchor" name="errors"></a>Errors <a class="hash-link" href="#errors">#</a></h2><p>See the <a href="../error" target="_blank" rel="nofollow noopener noreferrer">Errors API Reference</a></p></div>
