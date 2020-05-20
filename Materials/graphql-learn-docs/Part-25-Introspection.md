<h1>Introspection</h1><div><p>It&apos;s often useful to ask a GraphQL schema for information about what
queries it supports. GraphQL allows us to do so using the introspection
system!</p><p>For our Star Wars example, the file
<a href="https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsIntrospection-test.js" target="_blank" rel="nofollow noopener noreferrer">starWarsIntrospection-test.js</a>
contains a number of queries demonstrating the introspection system, and is a
test file that can be run to exercise the reference implementation&apos;s
introspection system.</p><p>We designed the type system, so we know what types are available, but if
we didn&apos;t, we can ask GraphQL, by querying the <code>__schema</code> field, always
available on the root type of a Query. Let&apos;s do so now, and ask what types
are available.</p><div id="r101"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>Wow, that&apos;s a lot of types! What are they? Let&apos;s group them:</p><ul><li><strong>Query, Character, Human, Episode, Droid</strong> - These are the ones that we
defined in our type system.</li><li><strong>String, Boolean</strong> - These are built-in scalars that the type system
provided.</li><li><strong>__Schema, __Type, __TypeKind, __Field, __InputValue,
__EnumValue, __Directive</strong> - These all are preceded with a double
underscore, indicating that they are part of the introspection system.</li></ul><p>Now, let&apos;s try and figure out a good place to start exploring what queries are
available. When we designed our type system, we specified what type all queries
would start at; let&apos;s ask the introspection system about that!</p><div id="r102"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>And that matches what we said in the type system section, that
the <code>Query</code> type is where we will start! Note that the naming here
was just by convention; we could have named our <code>Query</code> type anything
else, and it still would have been returned here had we specified it
was the starting type for queries. Naming it <code>Query</code>, though, is a useful
convention.</p><p>It is often useful to examine one specific type. Let&apos;s take a look at
the <code>Droid</code> type:</p><div id="r103"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>What if we want to know more about Droid, though? For example, is it
an interface or an object?</p><div id="r104"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p><code>kind</code> returns a <code>__TypeKind</code> enum, one of whose values is <code>OBJECT</code>. If
we asked about <code>Character</code> instead we&apos;d find that it is an interface:</p><div id="r105"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>It&apos;s useful for an object to know what fields are available, so let&apos;s
ask the introspection system about <code>Droid</code>:</p><div id="r106"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>Those are our fields that we defined on <code>Droid</code>!</p><p><code>id</code> looks a bit weird there, it has no name for the type. That&apos;s
because it&apos;s a &quot;wrapper&quot; type of kind <code>NON_NULL</code>. If we queried for
<code>ofType</code> on that field&apos;s type, we would find the <code>ID</code> type there,
telling us that this is a non-null ID.</p><p>Similarly, both <code>friends</code> and <code>appearsIn</code> have no name, since they are the
<code>LIST</code> wrapper type. We can query for <code>ofType</code> on those types, which will
tell us what these are lists of.</p><div id="r107"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>Let&apos;s end with a feature of the introspection system particularly useful
for tooling; let&apos;s ask the system for documentation!</p><div id="r108"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>So we can access the documentation about the type system using introspection,
and create documentation browsers, or rich IDE experiences.</p><p>This has just scratched the surface of the introspection system; we can
query for enum values, what interfaces a type implements, and more. We
can even introspect on the introspection system itself. The specification goes
into more detail about this topic in the &quot;Introspection&quot; section, and the <a href="https://github.com/graphql/graphql-js/blob/master/src/type/introspection.js" target="_blank" rel="nofollow noopener noreferrer">introspection</a>
file in GraphQL.js contains code implementing a specification-compliant GraphQL
query introspection system.</p></div>
