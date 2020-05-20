<h1>Introduction to GraphQL</h1><div><blockquote><p>Learn about GraphQL, how it works, and how to use it in this series of articles. Looking for documentation on how to build a GraphQL service? There are libraries to help you implement GraphQL in <a href="/code/">many different languages</a>. For an in-depth learning experience with practical tutorials, visit the <a href="https://www.howtographql.com" target="_blank" rel="nofollow noopener noreferrer">How to GraphQL</a> fullstack tutorial website. We have also partnered with edX to create a free online course, <a href="https://www.edx.org/course/exploring-graphql-a-query-language-for-apis" target="_blank" rel="nofollow noopener noreferrer">Exploring GraphQL: A Query Language for APIs</a>.</p></blockquote><p>GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn&apos;t tied to any specific database or storage engine and is instead backed by your existing code and data.</p><p>A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (<code>me</code>) as well as that user&apos;s name might look something like this:</p><pre class="prism language-graphql"><span class="type-def"><span class="keyword">type</span> Query <span class="fields"><span class="punctuation">{</span>
  <span class="attr-name">me</span><span class="punctuation">:</span> <span class="type-name">User</span>
<span class="punctuation">}</span></span></span>

<span class="type-def"><span class="keyword">type</span> User <span class="fields"><span class="punctuation">{</span>
<span class="attr-name">id</span><span class="punctuation">:</span> <span class="type-name">ID</span>
<span class="attr-name">name</span><span class="punctuation">:</span> <span class="type-name">String</span>
<span class="punctuation">}</span></span></span></pre><p>Along with functions for each field on each type:</p><pre class="prism language-js"><span class="keyword">function</span> <span class="function">Query_me</span><span class="punctuation">(</span>request<span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">return</span> request<span class="punctuation">.</span>auth<span class="punctuation">.</span>user<span class="punctuation">;</span>
<span class="punctuation">}</span>

<span class="keyword">function</span> <span class="function">User_name</span><span class="punctuation">(</span>user<span class="punctuation">)</span> <span class="punctuation">{</span>
<span class="keyword">return</span> user<span class="punctuation">.</span><span class="function">getName</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">}</span></pre><p>Once a GraphQL service is running (typically at a URL on a web service), it can receive GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.</p><p>For example the query:</p><pre class="prism language-graphql"><span class="punctuation">{</span>
me <span class="punctuation">{</span>
name
<span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>Could produce the JSON result:</p><pre class="prism language-json"><span class="punctuation">{</span>
<span class="attr-name">&quot;me&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
<span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Luke Skywalker&quot;</span>
<span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>Learn more about GraphQL &#x2014; the query language, type system, how the GraphQL service works, as well as best practices for using GraphQL in the articles written in this section; they help to solve common problems.</p></div>
