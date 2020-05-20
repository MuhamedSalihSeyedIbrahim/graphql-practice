<h1>graphql/execution</h1><div><p>The <code>graphql/execution</code> module is responsible for the execution phase of
fulfilling a GraphQL request. You can import either from the <code>graphql/execution</code> module, or from the root <code>graphql</code> module. For example:</p><pre class="prism language-js"><span class="keyword">import</span> <span class="punctuation">{</span> execute <span class="punctuation">}</span> <span class="keyword">from</span> <span class="string">&apos;graphql&apos;</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// ES6</span>
<span class="keyword">var</span> <span class="punctuation">{</span> execute <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// CommonJS</span></pre><h2><a class="anchor" name="overview"></a>Overview <a class="hash-link" href="#overview">#</a></h2><div><ul class="apiIndex">
  <li>
    <a href="#execute">
      <pre>function execute</pre>
      Executes a GraphQL request on the provided schema.
    </a>
  </li>
</ul>

</div><h2><a class="anchor" name="execution"></a>Execution <a class="hash-link" href="#execution">#</a></h2><h3><a class="anchor" name="execute"></a>execute <a class="hash-link" href="#execute">#</a></h3><pre class="prism language-js"><span class="keyword">export</span> <span class="keyword">function</span> <span class="function">execute</span><span class="punctuation">(</span>
  schema<span class="punctuation">:</span> GraphQLSchema<span class="punctuation">,</span>
  documentAST<span class="punctuation">:</span> Document<span class="punctuation">,</span>
  rootValue<span class="operator">?</span><span class="punctuation">:</span> mixed<span class="punctuation">,</span>
  contextValue<span class="operator">?</span><span class="punctuation">:</span> mixed<span class="punctuation">,</span>
  variableValues<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span><span class="punctuation">{</span><span class="punctuation">[</span>key<span class="punctuation">:</span> string<span class="punctuation">]</span><span class="punctuation">:</span> mixed<span class="punctuation">}</span><span class="punctuation">,</span>
  operationName<span class="operator">?</span><span class="punctuation">:</span> <span class="operator">?</span>string
<span class="punctuation">)</span><span class="punctuation">:</span> MaybePromise<span class="operator">&lt;</span>ExecutionResult<span class="operator">&gt;</span>

type MaybePromise<span class="operator">&lt;</span>T<span class="operator">&gt;</span> <span class="operator">=</span> Promise<span class="operator">&lt;</span>T<span class="operator">&gt;</span> <span class="operator">|</span> T<span class="punctuation">;</span>

type ExecutionResult <span class="operator">=</span> <span class="punctuation">{</span>
data<span class="punctuation">:</span> <span class="operator">?</span>Object<span class="punctuation">;</span>
errors<span class="operator">?</span><span class="punctuation">:</span> Array<span class="operator">&lt;</span>GraphQLError<span class="operator">&gt;</span><span class="punctuation">;</span>
<span class="punctuation">}</span></pre><p>Implements the &quot;Evaluating requests&quot; section of the GraphQL specification.</p><p>Returns a Promise that will eventually be resolved and never rejected.</p><p>If the arguments to this function do not result in a legal execution context,
a GraphQLError will be thrown immediately explaining the invalid input.</p><p><code>ExecutionResult</code> represents the result of execution. <code>data</code> is the result of
executing the query, <code>errors</code> is null if no errors occurred, and is a
non-empty array if an error occurred.</p></div>
