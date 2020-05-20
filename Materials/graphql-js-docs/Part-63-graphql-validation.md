<h1>graphql/validation</h1><div><p>The <code>graphql/validation</code> module fulfills the Validation phase of fulfilling a
GraphQL result. You can import either from the <code>graphql/validation</code> module, or from the root <code>graphql</code> module. For example:</p><pre class="prism language-js"><span class="keyword">import</span> <span class="punctuation">{</span> validate <span class="punctuation">}</span> <span class="keyword">from</span> <span class="string">&apos;graphql/validation&apos;</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// ES6</span>
<span class="keyword">var</span> <span class="punctuation">{</span> validate <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql/validation&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// CommonJS</span></pre><h2><a class="anchor" name="overview"></a>Overview <a class="hash-link" href="#overview">#</a></h2><div><ul class="apiIndex">
  <li>
    <a href="#validate">
      <pre>function validate</pre>
      Validates an AST against a provided Schema.
    </a>
  </li>
  <li>
    <a href="#specifiedrules">
      <pre>var specifiedRules</pre>
      A list of standard validation rules described in the GraphQL specification.
    </a>
  </li>
</ul>

</div><h2><a class="anchor" name="validation"></a>Validation <a class="hash-link" href="#validation">#</a></h2><h3><a class="anchor" name="validate"></a>validate <a class="hash-link" href="#validate">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">validate</span><span class="punctuation">(</span>
  schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">,</span>
  ast<span class="punctuation">:</span> Document<span class="punctuation">,</span>
  rules<span class="operator">?</span><span class="punctuation">:</span> Array<span class="operator">&lt;</span>any<span class="operator">&gt;</span>
<span class="punctuation">)</span><span class="punctuation">:</span> Array<span class="operator">&lt;</span>GraphQLError<span class="operator">&gt;</span></pre><p>Implements the &quot;Validation&quot; section of the spec.</p><p>Validation runs synchronously, returning an array of encountered errors, or
an empty array if no errors were encountered and the document is valid.</p><p>A list of specific validation rules may be provided. If not provided, the
default list of rules defined by the GraphQL specification will be used.</p><p>Each validation rules is a function which returns a visitor
(see the language/visitor API). Visitor methods are expected to return
GraphQLErrors, or Arrays of GraphQLErrors when invalid.</p><p>Visitors can also supply <code>visitSpreadFragments: true</code> which will alter the
behavior of the visitor to skip over top level defined fragments, and instead
visit those fragments at every point a spread is encountered.</p><h3><a class="anchor" name="specifiedrules"></a>specifiedRules <a class="hash-link" href="#specifiedrules">#</a></h3><pre class="prism language-js"><span class="keyword">var</span> specifiedRules<span class="punctuation">:</span> Array<span class="operator">&lt;</span><span class="punctuation">(</span>context<span class="punctuation">:</span> ValidationContext<span class="punctuation">)</span><span class="punctuation">:</span> any<span class="operator">&gt;</span></pre><p>This set includes all validation rules defined by the GraphQL spec</p></div>
