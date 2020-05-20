<h1>graphql/error</h1><div><p>The <code>graphql/error</code> module is responsible for creating and formatting
GraphQL errors. You can import either from the <code>graphql/error</code> module, or from the root <code>graphql</code> module. For example:</p><pre class="prism language-js"><span class="keyword">import</span> <span class="punctuation">{</span> GraphQLError <span class="punctuation">}</span> <span class="keyword">from</span> <span class="string">&apos;graphql&apos;</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// ES6</span>
<span class="keyword">var</span> <span class="punctuation">{</span> GraphQLError <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// CommonJS</span></pre><h2><a class="anchor" name="overview"></a>Overview <a class="hash-link" href="#overview">#</a></h2><div><ul class="apiIndex">
  <li>
    <a href="#graphqlerror">
      <pre>class GraphQLError</pre>
      A representation of an error that occurred within GraphQL.
    </a>
  </li>
  <li>
    <a href="#syntaxerror">
      <pre>function syntaxError</pre>
      Produces a GraphQLError representing a syntax error.
    </a>
  </li>
  <li>
    <a href="#locatedError">
      <pre>function locatedError</pre>
      Produces a new GraphQLError aware of the location responsible for the error.
    </a>
  </li>
  <li>
    <a href="#formaterror">
      <pre>function formatError</pre>
      Format an error according to the rules described by the Response Format.
    </a>
  </li>
</ul>

</div><h2><a class="anchor" name="errors"></a>Errors <a class="hash-link" href="#errors">#</a></h2><h3><a class="anchor" name="graphqlerror"></a>GraphQLError <a class="hash-link" href="#graphqlerror">#</a></h3><pre class="prism language-js"><span class="keyword">class</span> <span class="class-name">GraphQLError</span> <span class="keyword">extends</span> <span class="class-name">Error</span> <span class="punctuation">{</span>
 <span class="function">constructor</span><span class="punctuation">(</span>
   message<span class="punctuation">:</span> string<span class="punctuation">,</span>
   nodes<span class="operator">?</span><span class="punctuation">:</span> Array<span class="operator">&lt;</span>any<span class="operator">&gt;</span><span class="punctuation">,</span>
   stack<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>string<span class="punctuation">,</span>
   source<span class="operator">?</span><span class="punctuation">:</span> Source<span class="punctuation">,</span>
   positions<span class="operator">?</span><span class="punctuation">:</span> Array<span class="operator">&lt;</span>number<span class="operator">&gt;</span><span class="punctuation">,</span>
   originalError<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>Error<span class="punctuation">,</span>
   extensions<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span><span class="punctuation">{</span> <span class="punctuation">[</span>key<span class="punctuation">:</span> string<span class="punctuation">]</span><span class="punctuation">:</span> mixed <span class="punctuation">}</span>
 <span class="punctuation">)</span>
<span class="punctuation">}</span></pre><p>A representation of an error that occurred within GraphQL. Contains
information about where in the query the error occurred for debugging. Most
commonly constructed with <code>locatedError</code> below.</p><h3><a class="anchor" name="syntaxerror"></a>syntaxError <a class="hash-link" href="#syntaxerror">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">syntaxError</span><span class="punctuation">(</span>
  source<span class="punctuation">:</span> Source<span class="punctuation">,</span>
  position<span class="punctuation">:</span> number<span class="punctuation">,</span>
  description<span class="punctuation">:</span> string
<span class="punctuation">)</span><span class="punctuation">:</span> GraphQLError<span class="punctuation">;</span></pre><p>Produces a GraphQLError representing a syntax error, containing useful
descriptive information about the syntax error&apos;s position in the source.</p><h3><a class="anchor" name="locatederror"></a>locatedError <a class="hash-link" href="#locatederror">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">locatedError</span><span class="punctuation">(</span>error<span class="punctuation">:</span> <span class="operator">?</span>Error<span class="punctuation">,</span> nodes<span class="punctuation">:</span> Array<span class="operator">&lt;</span>any<span class="operator">&gt;</span><span class="punctuation">)</span><span class="punctuation">:</span> GraphQLError <span class="punctuation">{</span></pre><p>Given an arbitrary Error, presumably thrown while attempting to execute a
GraphQL operation, produce a new GraphQLError aware of the location in the
document responsible for the original Error.</p><h3><a class="anchor" name="formaterror"></a>formatError <a class="hash-link" href="#formaterror">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">formatError</span><span class="punctuation">(</span>error<span class="punctuation">:</span> GraphQLError<span class="punctuation">)</span><span class="punctuation">:</span> GraphQLFormattedError

type GraphQLFormattedError <span class="operator">=</span> <span class="punctuation">{</span>
message<span class="punctuation">:</span> string<span class="punctuation">,</span>
locations<span class="punctuation">:</span> <span class="operator">?</span>Array<span class="operator">&lt;</span>GraphQLErrorLocation<span class="operator">&gt;</span>
<span class="punctuation">}</span><span class="punctuation">;</span>

type GraphQLErrorLocation <span class="operator">=</span> <span class="punctuation">{</span>
line<span class="punctuation">:</span> number<span class="punctuation">,</span>
column<span class="punctuation">:</span> number
<span class="punctuation">}</span><span class="punctuation">;</span></pre><p>Given a GraphQLError, format it according to the rules described by the
Response Format, Errors section of the GraphQL Specification.</p></div>
