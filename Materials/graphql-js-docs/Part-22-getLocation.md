<h1>graphql/language</h1><div><p>The <code>graphql/language</code> module is responsible for parsing and operating on the GraphQL language. You can import either from the <code>graphql/language</code> module, or from the root <code>graphql</code> module. For example:</p><pre class="prism language-js"><span class="keyword">import</span> <span class="punctuation">{</span> Source <span class="punctuation">}</span> <span class="keyword">from</span> <span class="string">&apos;graphql&apos;</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// ES6</span>
<span class="keyword">var</span> <span class="punctuation">{</span> Source <span class="punctuation">}</span> <span class="operator">=</span> <span class="function">require</span><span class="punctuation">(</span><span class="string">&apos;graphql&apos;</span><span class="punctuation">)</span><span class="punctuation">;</span> <span spellcheck="true" class="comment">// CommonJS</span></pre><h2><a class="anchor" name="overview"></a>Overview <a class="hash-link" href="#overview">#</a></h2><p><em>Source</em></p><div><ul class="apiIndex">
  <li>
    <a href="#source">
      <pre>class Source</pre>
      Represents the input string to the GraphQL server
    </a>
  </li>
  <li>
    <a href="#getlocation">
      <pre>function getLocation</pre>
      Converts a character offset to a row and column in the Source
    </a>
  </li>
</ul>

</div><p><em>Lexer</em></p><div><ul class="apiIndex">
  <li>
    <a href="#lex">
      <pre>function lex</pre>
      Lexes a GraphQL Source according to the GraphQL Grammar
    </a>
  </li>
</ul>

</div><p><em>Parser</em></p><div><ul class="apiIndex">
  <li>
    <a href="#parse">
      <pre>function parse</pre>
      Parses a GraphQL Source according to the GraphQL Grammar
    </a>
  </li>
  <li>
    <a href="#parseValue">
      <pre>function parseValue</pre>
      Parses a value according to the GraphQL Grammar
    </a>
  </li>
  <li>
    <a href="#kind">
      <pre>var Kind</pre>
      Represents the various kinds of parsed AST nodes.
    </a>
  </li>
</ul>

</div><p><em>Visitor</em></p><div><ul class="apiIndex">
  <li>
    <a href="#visit">
      <pre>function visit</pre>
      A general-purpose visitor to traverse a parsed GraphQL AST
    </a>
  </li>
  <li>
    <a href="#break">
      <pre>var BREAK</pre>
      A token to allow breaking out of the visitor.
    </a>
  </li>
</ul>

</div><p><em>Printer</em></p><div><ul class="apiIndex">
  <li>
    <a href="#print">
      <pre>function print</pre>
      Prints an AST in a standard format.
    </a>
  </li>
</ul>

</div><h2><a class="anchor" name="source"></a>Source <a class="hash-link" href="#source">#</a></h2><h3><a class="anchor" name="source-1"></a>Source <a class="hash-link" href="#source-1">#</a></h3><pre class="prism language-js"><span class="keyword">export</span> <span class="keyword">class</span> <span class="class-name">Source</span> <span class="punctuation">{</span>
  <span class="function">constructor</span><span class="punctuation">(</span>body<span class="punctuation">:</span> string<span class="punctuation">,</span> name<span class="operator">?</span><span class="punctuation">:</span> string<span class="punctuation">)</span>
<span class="punctuation">}</span></pre><p>A representation of source input to GraphQL. The name is optional,
but is mostly useful for clients who store GraphQL documents in
source files; for example, if the GraphQL input is in a file Foo.graphql,
it might be useful for name to be &quot;Foo.graphql&quot;.</p><h3><a class="anchor" name="getlocation"></a>getLocation <a class="hash-link" href="#getlocation">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">getLocation</span><span class="punctuation">(</span>source<span class="punctuation">:</span> Source<span class="punctuation">,</span> position<span class="punctuation">:</span> number<span class="punctuation">)</span><span class="punctuation">:</span> SourceLocation

type SourceLocation <span class="operator">=</span> <span class="punctuation">{</span>
line<span class="punctuation">:</span> number<span class="punctuation">;</span>
column<span class="punctuation">:</span> number<span class="punctuation">;</span>
<span class="punctuation">}</span></pre><p>Takes a Source and a UTF-8 character offset, and returns the corresponding
line and column as a SourceLocation.</p><h2><a class="anchor" name="lexer"></a>Lexer <a class="hash-link" href="#lexer">#</a></h2><h3><a class="anchor" name="lex"></a>lex <a class="hash-link" href="#lex">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">lex</span><span class="punctuation">(</span>source<span class="punctuation">:</span> Source<span class="punctuation">)</span><span class="punctuation">:</span> Lexer<span class="punctuation">;</span>

type Lexer <span class="operator">=</span> <span class="punctuation">(</span>resetPosition<span class="operator">?</span><span class="punctuation">:</span> number<span class="punctuation">)</span> <span class="operator">=</span><span class="operator">&gt;</span> Token<span class="punctuation">;</span>

<span class="keyword">export</span> type Token <span class="operator">=</span> <span class="punctuation">{</span>
kind<span class="punctuation">:</span> number<span class="punctuation">;</span>
start<span class="punctuation">:</span> number<span class="punctuation">;</span>
end<span class="punctuation">:</span> number<span class="punctuation">;</span>
value<span class="punctuation">:</span> <span class="operator">?</span>string<span class="punctuation">;</span>
<span class="punctuation">}</span><span class="punctuation">;</span></pre><p>Given a Source object, this returns a Lexer for that source.
A Lexer is a function that acts like a generator in that every time
it is called, it returns the next token in the Source. Assuming the
source lexes, the final Token emitted by the lexer will be of kind
EOF, after which the lexer will repeatedly return EOF tokens whenever
called.</p><p>The argument to the lexer function is optional, and can be used to
rewind or fast forward the lexer to a new position in the source.</p><h2><a class="anchor" name="parser"></a>Parser <a class="hash-link" href="#parser">#</a></h2><h3><a class="anchor" name="parse"></a>parse <a class="hash-link" href="#parse">#</a></h3><pre class="prism language-js"><span class="keyword">export</span> <span class="keyword">function</span> <span class="function">parse</span><span class="punctuation">(</span>
source<span class="punctuation">:</span> Source <span class="operator">|</span> string<span class="punctuation">,</span>
options<span class="operator">?</span><span class="punctuation">:</span> ParseOptions
<span class="punctuation">)</span><span class="punctuation">:</span> Document</pre><p>Given a GraphQL source, parses it into a Document.</p><p>Throws GraphQLError if a syntax error is encountered.</p><h3><a class="anchor" name="parsevalue"></a>parseValue <a class="hash-link" href="#parsevalue">#</a></h3><pre class="prism language-js"><span class="keyword">export</span> <span class="keyword">function</span> <span class="function">parseValue</span><span class="punctuation">(</span>
source<span class="punctuation">:</span> Source <span class="operator">|</span> string<span class="punctuation">,</span>
options<span class="operator">?</span><span class="punctuation">:</span> ParseOptions
<span class="punctuation">)</span><span class="punctuation">:</span> Value</pre><p>Given a string containing a GraphQL value, parse the AST for that value.</p><p>Throws GraphQLError if a syntax error is encountered.</p><p>This is useful within tools that operate upon GraphQL Values directly and
in isolation of complete GraphQL documents.</p><h3><a class="anchor" name="kind"></a>Kind <a class="hash-link" href="#kind">#</a></h3><p>An enum that describes the different kinds of AST nodes.</p><h2><a class="anchor" name="visitor"></a>Visitor <a class="hash-link" href="#visitor">#</a></h2><h3><a class="anchor" name="visit"></a>visit <a class="hash-link" href="#visit">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">visit</span><span class="punctuation">(</span>root<span class="punctuation">,</span> visitor<span class="punctuation">,</span> keyMap<span class="punctuation">)</span></pre><p>visit() will walk through an AST using a depth first traversal, calling
the visitor&apos;s enter function at each node in the traversal, and calling the
leave function after visiting that node and all of its child nodes.</p><p>By returning different values from the enter and leave functions, the
behavior of the visitor can be altered, including skipping over a sub-tree of
the AST (by returning false), editing the AST by returning a value or null
to remove the value, or to stop the whole traversal by returning BREAK.</p><p>When using visit() to edit an AST, the original AST will not be modified, and
a new version of the AST with the changes applied will be returned from the
visit function.</p><pre class="prism language-js"><span class="keyword">var</span> editedAST <span class="operator">=</span> <span class="function">visit</span><span class="punctuation">(</span>ast<span class="punctuation">,</span> <span class="punctuation">{</span>
<span class="function">enter</span><span class="punctuation">(</span>node<span class="punctuation">,</span> key<span class="punctuation">,</span> parent<span class="punctuation">,</span> path<span class="punctuation">,</span> ancestors<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// @return</span>
<span spellcheck="true" class="comment">// undefined: no action</span>
<span spellcheck="true" class="comment">// false: skip visiting this node</span>
<span spellcheck="true" class="comment">// visitor.BREAK: stop visiting altogether</span>
<span spellcheck="true" class="comment">// null: delete this node</span>
<span spellcheck="true" class="comment">// any value: replace this node with the returned value</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="function">leave</span><span class="punctuation">(</span>node<span class="punctuation">,</span> key<span class="punctuation">,</span> parent<span class="punctuation">,</span> path<span class="punctuation">,</span> ancestors<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// @return</span>
<span spellcheck="true" class="comment">// undefined: no action</span>
<span spellcheck="true" class="comment">// false: no action</span>
<span spellcheck="true" class="comment">// visitor.BREAK: stop visiting altogether</span>
<span spellcheck="true" class="comment">// null: delete this node</span>
<span spellcheck="true" class="comment">// any value: replace this node with the returned value</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span><span class="punctuation">;</span></pre><p>Alternatively to providing enter() and leave() functions, a visitor can
instead provide functions named the same as the kinds of AST nodes, or
enter/leave visitors at a named key, leading to four permutations of
visitor API:</p><p>1) Named visitors triggered when entering a node a specific kind.</p><pre class="prism language-js"><span class="function">visit</span><span class="punctuation">(</span>ast<span class="punctuation">,</span> <span class="punctuation">{</span>
<span class="function">Kind</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// enter the &quot;Kind&quot; node</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span></pre><p>2) Named visitors that trigger upon entering and leaving a node of
a specific kind.</p><pre class="prism language-js"><span class="function">visit</span><span class="punctuation">(</span>ast<span class="punctuation">,</span> <span class="punctuation">{</span>
Kind<span class="punctuation">:</span> <span class="punctuation">{</span>
<span class="function">enter</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// enter the &quot;Kind&quot; node</span>
<span class="punctuation">}</span>
<span class="function">leave</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// leave the &quot;Kind&quot; node</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span></pre><p>3) Generic visitors that trigger upon entering and leaving any node.</p><pre class="prism language-js"><span class="function">visit</span><span class="punctuation">(</span>ast<span class="punctuation">,</span> <span class="punctuation">{</span>
<span class="function">enter</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// enter any node</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
<span class="function">leave</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// leave any node</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span></pre><p>4) Parallel visitors for entering and leaving nodes of a specific kind.</p><pre class="prism language-js"><span class="function">visit</span><span class="punctuation">(</span>ast<span class="punctuation">,</span> <span class="punctuation">{</span>
enter<span class="punctuation">:</span> <span class="punctuation">{</span>
<span class="function">Kind</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// enter the &quot;Kind&quot; node</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">,</span>
leave<span class="punctuation">:</span> <span class="punctuation">{</span>
<span class="function">Kind</span><span class="punctuation">(</span>node<span class="punctuation">)</span> <span class="punctuation">{</span>
<span spellcheck="true" class="comment">// leave the &quot;Kind&quot; node</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span><span class="punctuation">)</span></pre><h3><a class="anchor" name="break"></a>BREAK <a class="hash-link" href="#break">#</a></h3><p>The sentinel <code>BREAK</code> value described in the documentation of <code>visitor</code>.</p><h2><a class="anchor" name="printer"></a>Printer <a class="hash-link" href="#printer">#</a></h2><h3><a class="anchor" name="print"></a>print <a class="hash-link" href="#print">#</a></h3><pre class="prism language-js"><span class="keyword">function</span> <span class="function">print</span><span class="punctuation">(</span>ast<span class="punctuation">)</span><span class="punctuation">:</span> string</pre><p>Converts an AST into a string, using one set of reasonable
formatting rules.</p></div>
