<h1>Validation</h1><div><p>By using the type system, it can be predetermined whether a GraphQL query
is valid or not. This allows servers and clients to effectively inform
developers when an invalid query has been created, without having to rely
on runtime checks.</p><p>For our Star Wars example, the file
<a href="https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsValidation-test.js" target="_blank" rel="nofollow noopener noreferrer">starWarsValidation-test.js</a>
contains a number of queries demonstrating various invalidities, and is a test
file that can be run to exercise the reference implementation&apos;s validator.</p><p>To start, let&apos;s take a complex valid query. This is a nested query, similar to
an example from the previous section, but with the duplicated fields factored
out into a fragment:</p><div id="r101"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>And this query is valid. Let&apos;s take a look at some invalid queries...</p><p>A fragment cannot refer to itself or create a cycle, as this could result in
an unbounded result! Here&apos;s the same query above but without the explicit three
levels of nesting:</p><div id="r102"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>When we query for fields, we have to query for a field that exists on the
given type. So as <code>hero</code> returns a <code>Character</code>, we have to query for a field
on <code>Character</code>. That type does not have a <code>favoriteSpaceship</code> field, so this
query is invalid:</p><div id="r103"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>Whenever we query for a field and it returns something other than a scalar
or an enum, we need to specify what data we want to get back from the field.
Hero returns a <code>Character</code>, and we&apos;ve been requesting fields like <code>name</code> and
<code>appearsIn</code> on it; if we omit that, the query will not be valid:</p><div id="r104"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>Similarly, if a field is a scalar, it doesn&apos;t make sense to query for
additional fields on it, and doing so will make the query invalid:</p><div id="r105"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>Earlier, it was noted that a query can only query for fields on the type
in question; when we query for <code>hero</code> which returns a <code>Character</code>, we
can only query for fields that exist on <code>Character</code>. What happens if we
want to query for R2-D2s primary function, though?</p><div id="r106"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>That query is invalid, because <code>primaryFunction</code> is not a field on <code>Character</code>.
We want some way of indicating that we wish to fetch <code>primaryFunction</code> if the
<code>Character</code> is a <code>Droid</code>, and to ignore that field otherwise. We can use
the fragments we introduced earlier to do this. By setting up a fragment defined
on <code>Droid</code> and including it, we ensure that we only query for <code>primaryFunction</code>
where it is defined.</p><div id="r107"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>This query is valid, but it&apos;s a bit verbose; named fragments were valuable
above when we used them multiple times, but we&apos;re only using this one once.
Instead of using a named fragment, we can use an inline fragment; this
still allows us to indicate the type we are querying on, but without naming
a separate fragment:</p><div id="r108"><div class="miniGraphiQL" data-reactroot data-reactid="1" data-react-checksum="-1260504911"><div class="query-editor" data-reactid="2"></div><div class="result-window" data-reactid="3"></div></div></div><p>This has just scratched the surface of the validation system; there
are a number of validation rules in place to ensure that a GraphQL query
is semantically meaningful. The specification goes into more detail about this
topic in the &quot;Validation&quot; section, and the
<a href="https://github.com/graphql/graphql-js/blob/master/src/validation" target="_blank" rel="nofollow noopener noreferrer">validation</a>
directory in GraphQL.js contains code implementing a
specification-compliant GraphQL validator.</p></div>
