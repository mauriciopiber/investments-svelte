<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/wallet">Wallet</a></li>
    <li><a href="/stocks">Stocks</a></li>
    <li><a href="/stocks/sectors">Sectors</a></li>
    <li><a href="/stocks/sub-sectors">Sub Sectors</a></li>
    <li><a href="/stocks/segments">Segments</a></li>
  </ul>
</nav>
<h1>Investment</h1>
<slot />

<style>
  nav {
    padding: 0;
    margin: 0;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    text-align: center;
    flex-grow: 1;
    background-color: #541094;
  }

  li:hover {
    background-color: #401094;
  }

  a {
    padding: 1rem;
    display: block;
    text-decoration: none;
    color: #fff;
  }
</style>
