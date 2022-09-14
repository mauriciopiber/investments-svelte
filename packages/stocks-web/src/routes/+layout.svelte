<script>
  import '../app.css';
</script>

<!--
<Header company="PBR" platformName="Stocks" bind:isSideNavOpen>

  <HeaderNav>
    <HeaderNavItem href="/" text="Home" />
    <HeaderNavItem href="/portfolio" text="Portfolio" />
    <HeaderNavMenu text="Stocks">
      <HeaderNavItem href="/stocks" text="Stocks" />
      <HeaderNavItem href="/stocks/sectors" text="Sectors" />
      <HeaderNavItem href="/stocks/sub-sectors" text="Sub sectors" />
      <HeaderNavItem href="/stocks/segments" text="Segments" />
      <HeaderNavItem href="/stocks/companies" text="Companies" />
      <HeaderNavItem href="/stocks/tickets" text="Tickets" />
    </HeaderNavMenu>
    <HeaderNavItem href="/status" text="Status" />
    <HeaderNavItem href="/filters" text="Filters" />
  </HeaderNav>
</Header> -->

<!-- <SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/" text="Home" />
    <SideNavLink href="/portfolio" text="Portfolio" />
    <SideNavMenu text="Stocks">
      <SideNavMenuItem href="/stocks" text="Stocks" />
      <SideNavMenuItem href="/stocks/sectors" text="Sectors" />
      <SideNavMenuItem href="/stocks/sub-sectors" text="Sub sectors" />
      <SideNavMenuItem href="/stocks/segments" text="Segments" />
      <SideNavMenuItem href="/stocks/companies" text="Companies" />
      <SideNavMenuItem href="/stocks/tickets" text="Tickets" />
    </SideNavMenu>
    <SideNavLink href="/status" text="Status" />
    <SideNavLink href="/filters" text="Filters" />
  </SideNavItems>
</SideNav> -->

<!-- <Content>
</Content> -->
<slot />
