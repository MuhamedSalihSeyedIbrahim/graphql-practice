<h1>Global Object Identification</h1><div><blockquote><p>Consistent object access enables simple caching and object lookups</p></blockquote><p>To provide options for GraphQL clients to elegantly handle caching and data 
refetching, GraphQL servers need to expose object identifiers in a standardized 
way. </p><p>For this to work, a client will need to query via a standard mechanism to 
request an object by ID. Then, in the response, the schema will need to provide a 
standard way of providing these IDs.</p><p>Because little is known about the object other than its ID, we call these
objects &quot;nodes.&quot; Here is an example query for a node:</p><pre class="prism language-graphql"><span class="punctuation">{</span>
  node<span class="punctuation">(</span><span class="attr-name">id</span><span class="punctuation">:</span> <span class="string">&quot;4&quot;</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    id
    <span class="operator">...</span> <span class="keyword">on</span> User <span class="punctuation">{</span>
      name
    <span class="punctuation">}</span>
  <span class="punctuation">}</span></pre><ul><li>The GraphQL schema is formatted to allow fetching any object via the <code>node</code> field on the root query object. This
returns objects which conform to a &quot;Node&quot; <a href="/learn/schema/#interfaces">interface</a>.</li><li>The <code>id</code> field can be extracted out of the response safely, and can be stored for re-use via caching and refetching.</li><li>Clients can use interface fragments to extract additional information specific to the type which conform to the node interface. In this case a &quot;User&quot;.</li></ul><p>The Node interface looks like:</p><pre class="prism language-graphql"><span spellcheck="true" class="comment"># An object with a Globally Unique ID</span>
interface Node <span class="punctuation">{</span>
  <span spellcheck="true" class="comment"># The ID of the object.</span>
  <span class="attr-name">id</span><span class="punctuation">:</span> ID<span class="operator">!</span>
<span class="punctuation">}</span></pre><p>With a User conforming via:</p><pre class="prism language-graphql">type User implements Node <span class="punctuation">{</span>
  <span class="attr-name">id</span><span class="punctuation">:</span> ID<span class="operator">!</span>
  <span spellcheck="true" class="comment"># Full name</span>
  <span class="attr-name">name</span><span class="punctuation">:</span> String<span class="operator">!</span>
<span class="punctuation">}</span></pre><h1><a class="anchor" name="specification"></a>Specification <a class="hash-link" href="#specification">#</a></h1><p>Everything below describes with more formal requirements a specification around object 
identification in order to conform to ensure consistency across server implementations. These 
specifications are based on how a server can be compliant with the <a href="https://facebook.github.io/relay/" target="_blank" rel="nofollow noopener noreferrer">Relay</a> API client, but 
can be useful for any client.</p><h1><a class="anchor" name="reserved-types"></a>Reserved Types <a class="hash-link" href="#reserved-types">#</a></h1><p>A GraphQL server compatible with this spec must reserve certain types and type names
to support the consistent object identification model. In particular, this spec creates 
guidelines for the following types:</p><ul><li>An interface named <code>Node</code>.</li><li>The <code>node</code> field on the root query type.</li></ul><h1><a class="anchor" name="node-interface"></a>Node Interface <a class="hash-link" href="#node-interface">#</a></h1><p>The server must provide an interface called <code>Node</code>. That interface
must include exactly one field, called <code>id</code> that returns a non-null <code>ID</code>.</p><p>This <code>id</code> should be a globally unique identifier for this object, and given
just this <code>id</code>, the server should be able to refetch the object.</p><h2><a class="anchor" name="introspection"></a>Introspection <a class="hash-link" href="#introspection">#</a></h2><p>A server that correctly implements the above interface will accept the following
introspection query, and return the provided response:</p><pre class="prism language-graphql"><span class="punctuation">{</span>
  __type<span class="punctuation">(</span><span class="attr-name">name</span><span class="punctuation">:</span> <span class="string">&quot;Node&quot;</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    name
    kind
    fields <span class="punctuation">{</span>
      name
      <span class="type-def"><span class="keyword">type</span> <span class="fields"><span class="punctuation">{</span>
        kind
        ofType <span class="punctuation">{</span>
          name
          kind
        <span class="punctuation">}</span>
      <span class="punctuation">}</span></span></span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>yields</p><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">&quot;__type&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Node&quot;</span><span class="punctuation">,</span>
    <span class="attr-name">&quot;kind&quot;</span><span class="punctuation">:</span> <span class="string">&quot;INTERFACE&quot;</span><span class="punctuation">,</span>
    <span class="attr-name">&quot;fields&quot;</span><span class="punctuation">:</span> <span class="punctuation">[</span>
      <span class="punctuation">{</span>
        <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;id&quot;</span><span class="punctuation">,</span>
        <span class="attr-name">&quot;type&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
          <span class="attr-name">&quot;kind&quot;</span><span class="punctuation">:</span> <span class="string">&quot;NON_NULL&quot;</span><span class="punctuation">,</span>
          <span class="attr-name">&quot;ofType&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
            <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;ID&quot;</span><span class="punctuation">,</span>
            <span class="attr-name">&quot;kind&quot;</span><span class="punctuation">:</span> <span class="string">&quot;SCALAR&quot;</span>
          <span class="punctuation">}</span>
        <span class="punctuation">}</span>
      <span class="punctuation">}</span>
    <span class="punctuation">]</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><h1><a class="anchor" name="node-root-field"></a>Node root field <a class="hash-link" href="#node-root-field">#</a></h1><p>The server must provide a root field called <code>node</code> that returns the <code>Node</code>
interface. This root field must take exactly one argument, a non-null ID
named <code>id</code>.</p><p>If a query returns an object that implements <code>Node</code>, then this root field
should refetch the identical object when value returned by the server in the
<code>Node</code>&apos;s <code>id</code> field is passed as the <code>id</code> parameter to the <code>node</code> root field.</p><p>The server must make a best effort to fetch this data, but it may not always
be possible; for example, the server may return a <code>User</code> with a valid <code>id</code>,
but when the request is made to refetch that user with the <code>node</code> root field,
the user&apos;s database may be unavailable, or the user may have deleted their
account. In this case, the result of querying this field should be <code>null</code>.</p><h2><a class="anchor" name="introspection-1"></a>Introspection <a class="hash-link" href="#introspection-1">#</a></h2><p>A server that correctly implements the above requirement will accept the
following introspection query, and return a response that contains the
provided response.</p><pre class="prism language-graphql"><span class="punctuation">{</span>
  __schema <span class="punctuation">{</span>
    queryType <span class="punctuation">{</span>
      fields <span class="punctuation">{</span>
        name
        <span class="type-def"><span class="keyword">type</span> <span class="fields"><span class="punctuation">{</span>
          name
          kind
        <span class="punctuation">}</span></span></span>
        args <span class="punctuation">{</span>
          name
          <span class="type-def"><span class="keyword">type</span> <span class="fields"><span class="punctuation">{</span>
            kind
            ofType <span class="punctuation">{</span>
              name
              kind
            <span class="punctuation">}</span>
          <span class="punctuation">}</span></span></span>
        <span class="punctuation">}</span>
      <span class="punctuation">}</span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>yields</p><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">&quot;__schema&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">&quot;queryType&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
      <span class="attr-name">&quot;fields&quot;</span><span class="punctuation">:</span> <span class="punctuation">[</span>
        // This array may have other entries
        <span class="punctuation">{</span>
          <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;node&quot;</span><span class="punctuation">,</span>
          <span class="attr-name">&quot;type&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
            <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Node&quot;</span><span class="punctuation">,</span>
            <span class="attr-name">&quot;kind&quot;</span><span class="punctuation">:</span> <span class="string">&quot;INTERFACE&quot;</span>
          <span class="punctuation">}</span><span class="punctuation">,</span>
          <span class="attr-name">&quot;args&quot;</span><span class="punctuation">:</span> <span class="punctuation">[</span>
            <span class="punctuation">{</span>
              <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;id&quot;</span><span class="punctuation">,</span>
              <span class="attr-name">&quot;type&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
                <span class="attr-name">&quot;kind&quot;</span><span class="punctuation">:</span> <span class="string">&quot;NON_NULL&quot;</span><span class="punctuation">,</span>
                <span class="attr-name">&quot;ofType&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
                  <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;ID&quot;</span><span class="punctuation">,</span>
                  <span class="attr-name">&quot;kind&quot;</span><span class="punctuation">:</span> <span class="string">&quot;SCALAR&quot;</span>
                <span class="punctuation">}</span>
              <span class="punctuation">}</span>
            <span class="punctuation">}</span>
          <span class="punctuation">]</span>
        <span class="punctuation">}</span>
      <span class="punctuation">]</span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><h1><a class="anchor" name="field-stability"></a>Field stability <a class="hash-link" href="#field-stability">#</a></h1><p>If two objects appear in a query, both implementing <code>Node</code> with identical
IDs, then the two objects must be equal.</p><p>For the purposes of this definition, object equality is defined as follows:</p><ul><li>If a field is queried on both objects, the result of querying that field on
the first object must be equal to the result of querying that field on the
second object.<ul><li>If the field returns a scalar, equality is defined as is appropriate for
that scalar.</li><li>If the field returns an enum, equality is defined as both fields returning
the same enum value.</li><li>If the field returns an object, equality is defined recursively as per the
above.</li></ul></li></ul><p>For example:</p><pre class="prism language-graphql"><span class="punctuation">{</span>
  <span class="attr-name">fourNode</span><span class="punctuation">:</span> node<span class="punctuation">(</span><span class="attr-name">id</span><span class="punctuation">:</span> <span class="string">&quot;4&quot;</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    id
    <span class="operator">...</span> <span class="keyword">on</span> User <span class="punctuation">{</span>
      name
      userWithIdOneGreater <span class="punctuation">{</span>
        id
        name
      <span class="punctuation">}</span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span>
  <span class="attr-name">fiveNode</span><span class="punctuation">:</span> node<span class="punctuation">(</span><span class="attr-name">id</span><span class="punctuation">:</span> <span class="string">&quot;5&quot;</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    id
    <span class="operator">...</span> <span class="keyword">on</span> User <span class="punctuation">{</span>
      name
      userWithIdOneLess <span class="punctuation">{</span>
        id
        name
      <span class="punctuation">}</span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>might return:</p><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">&quot;fourNode&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;4&quot;</span><span class="punctuation">,</span>
    <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Mark Zuckerberg&quot;</span><span class="punctuation">,</span>
    <span class="attr-name">&quot;userWithIdOneGreater&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
      <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;5&quot;</span><span class="punctuation">,</span>
      <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Chris Hughes&quot;</span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span><span class="punctuation">,</span>
  <span class="attr-name">&quot;fiveNode&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;5&quot;</span><span class="punctuation">,</span>
    <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Chris Hughes&quot;</span><span class="punctuation">,</span>
    <span class="attr-name">&quot;userWithIdOneLess&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
      <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;4&quot;</span><span class="punctuation">,</span>
      <span class="attr-name">&quot;name&quot;</span><span class="punctuation">:</span> <span class="string">&quot;Mark Zuckerberg&quot;</span><span class="punctuation">,</span>
    <span class="punctuation">}</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>Because <code>fourNode.id</code> and <code>fiveNode.userWithIdOneLess.id</code> are the same, we are
guaranteed by the conditions above that <code>fourNode.name</code> must be the same as
<code>fiveNode.userWithIdOneLess.name</code>, and indeed it is.</p><h1><a class="anchor" name="plural-identifying-root-fields"></a>Plural identifying root fields <a class="hash-link" href="#plural-identifying-root-fields">#</a></h1><p>Imagine a root field named <code>username</code>, that takes a user&apos;s username and
returns the corresponding user:</p><pre class="prism language-graphql"><span class="punctuation">{</span>
  username<span class="punctuation">(</span><span class="attr-name">username</span><span class="punctuation">:</span> <span class="string">&quot;zuck&quot;</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    id
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>might return:</p><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">&quot;username&quot;</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;4&quot;</span><span class="punctuation">,</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>Clearly, we can link up the object in the response, the user with ID 4,
with the request, identifying the object with username &quot;zuck&quot;. Now imagine a
root field named <code>usernames</code>, that takes a list of usernames and returns a
list of objects:</p><pre class="prism language-graphql"><span class="punctuation">{</span>
  usernames<span class="punctuation">(</span><span class="attr-name">usernames</span><span class="punctuation">:</span> <span class="punctuation">[</span><span class="string">&quot;zuck&quot;</span><span class="punctuation">,</span> <span class="string">&quot;moskov&quot;</span><span class="punctuation">]</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    id
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre><p>might return:</p><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">&quot;usernames&quot;</span><span class="punctuation">:</span> <span class="punctuation">[</span>
    <span class="punctuation">{</span>
      <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;4&quot;</span><span class="punctuation">,</span>
    <span class="punctuation">}</span><span class="punctuation">,</span>
    <span class="punctuation">{</span>
      <span class="attr-name">&quot;id&quot;</span><span class="punctuation">:</span> <span class="string">&quot;6&quot;</span>
    <span class="punctuation">}</span>
  <span class="punctuation">]</span>
<span class="punctuation">}</span></pre><p>For clients to be able to link the usernames to the responses, it needs to
know that the array in the response will be the same size as the array
passed as an argument, and that the order in the response will match the
order in the argument. We call these <em>plural identifying root fields</em>, and
their requirements are described below.</p><h2><a class="anchor" name="fields"></a>Fields <a class="hash-link" href="#fields">#</a></h2><p>A server compliant with this spec may expose root fields that accept a list of input
arguments, and returns a list of responses. For spec-compliant clients to use these fields,
these fields must be <em>plural identifying root fields</em>, and obey the following
requirements.</p><p>NOTE Spec-compliant servers may expose root fields that are not <em>plural
identifying root fields</em>; the spec-compliant client will just be unable to use those
fields as root fields in its queries.</p><p><em>Plural identifying root fields</em> must have a single argument. The type of that
argument must be a non-null list of non-nulls. In our <code>usernames</code> example, the
field would take a single argument named <code>usernames</code>, whose type (using our type
system shorthand) would be <code>[String!]!</code>.</p><p>The return type of a <em>plural identifying root field</em> must be a list, or a
non-null wrapper around a list. The list must wrap the <code>Node</code> interface, an
object that implements the <code>Node</code> interface, or a non-null wrapper around
those types.</p><p>Whenever the <em>plural identifying root field</em> is used, the length of the
list in the response must be the same as the length of the list in the
arguments. Each item in the response must correspond to its item in the input;
more formally, if passing the root field an input list <code>Lin</code> resulted in output
value <code>Lout</code>, then for an arbitrary permutation <code>P</code>, passing the root field
<code>P(Lin)</code> must result in output value <code>P(Lout)</code>.</p><p>Because of this, servers are advised to not have the response type
wrap a non-null wrapper, because if it is unable to fetch the object for
a given entry in the input, it still must provide a value in the output
for that input entry; <code>null</code> is a useful value for doing so.</p></div>
