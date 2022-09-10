<script>
  import 'carbon-components-svelte/css/white.css';
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    Content
  } from 'carbon-components-svelte';
  let isSideNavOpen = true;
</script>

<Header company="PBR" platformName="Stocks" bind:isSideNavOpen>
  <!-- <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment> -->
  <HeaderNav>
    <HeaderNavItem href="/" text="Home" />
    <HeaderNavItem href="/wallet" text="Wallet" />
    <HeaderNavMenu text="Stocks">
      <HeaderNavItem href="/stocks" text="Stocks" />
      <HeaderNavItem href="/stocks/sectors" text="Sectors" />
      <HeaderNavItem href="/stocks/sub-sectors" text="Sub sectors" />
      <HeaderNavItem href="/stocks/segments" text="Segments" />
      <HeaderNavItem href="/stocks/companies" text="Companies" />
      <HeaderNavItem href="/stocks/tickets" text="Tickets" />
    </HeaderNavMenu>
    <HeaderNavItem href="/status" text="Status" />
  </HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/" text="Home" />
    <SideNavLink href="/wallet" text="Wallet" />
    <SideNavMenu text="Stocks">
      <SideNavMenuItem href="/stocks" text="Stocks" />
      <SideNavMenuItem href="/stocks/sectors" text="Sectors" />
      <SideNavMenuItem href="/stocks/sub-sectors" text="Sub sectors" />
      <SideNavMenuItem href="/stocks/segments" text="Segments" />
      <SideNavMenuItem href="/stocks/companies" text="Companies" />
      <SideNavMenuItem href="/stocks/tickets" text="Tickets" />
    </SideNavMenu>
    <SideNavLink href="/status" text="Status" />
  </SideNavItems>
</SideNav>

<Content>
  <slot />
</Content>
