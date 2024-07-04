<script lang="ts">
import { goto } from '$app/navigation';
import {Home,User,ReceiptIndianRupee,Files} from 'lucide-svelte';
import { Clock3, Search, Bell, Atom } from 'lucide-svelte';
import "$lib/styles/app.css";
// import { page } from '$app/stores'
// import SalesOrderTable from '$lib/components/SalesOrderTable.svelte';

let LeftNavItems= [
    { icon: Clock3, text: 'Home', href: '/' },
    { icon: Search, text: 'Search', href: '/search' },
  ];
let RightNavItems=[
    { icon: Bell, text: 'Notifications', href: '/notifications' },
    { icon: Atom, text: 'Profile', href: '/profile' },
  ]
  </script>

<style>
.dash-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 40px; width: 176px;
    padding-left: 17px;
    color: white;
    cursor: pointer;}
.dash-button:hover {background-color: rgb(22 163 74);border-radius: 10px;margin-left:5px;padding-left: 12px;}

nav {
    background-color:rgb(243 244 246);
    padding:10px;
    position: fixed;
    top: 0;
    left: 192px;
    right:15px;
    height: 50px;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0px;
    align-items: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0rem;
  }

  li {
    margin: 0 0.25rem;
  }

  a {
    color:black;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a:hover {
    color: rgb(22 163 74);
  }

  header {
    background-color: #f0f0f0;
    padding:10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 192px;
  }
        
  options {
    margin-top: 20px;
    margin-left: 192px;
  }
  options a {
    margin-right: 20px;
    text-decoration: none;
    color: #333;
    margin-left: 192px;
  }
  .active {
    border-bottom: 2px solid blue;;
  }
  .dashboard-content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    margin-left: 192px;
  }
  .card {
    flex: 1 1 300px;
    margin: 10px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .progress-bar {
    background-color: #e0e0e0;
    height: 20px;
    margin-top: 10px;
    border-radius: 10px;
  }
  .progress {
    height: 100%;
    background-color: #4CAF50;
    border-radius: 10px;
  }

.logo {
  width: 50px;
  height: 50px;
  }

.card {
  background-color:white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  /* flex: 1 1 300px; */
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color:black;
  margin: 0;
}
.new-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
.total-unpaid {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.875rem;
}
.progress-bar {
  height: 12px;
  background-color: #f8b408;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 15px;
}
.progress1 {
  border-radius: 2px;
  width: 20%;
  height: 100%;
  background-color: #007bff;
}
.progress2 {
  border-radius: 2px;
  width: 15%;
  height: 100%;
  background-color: #007bff;
}
.amounts {
  display: flex;
  justify-content: space-between;
}
.amount {
  flex: 1;
}
.amount-label {
  font-size: 14px;
  margin-bottom: 5px;
}
.amount-value {
  font-size: 18px;
  font-weight: bold;
}
.overdue {
  color: black;
  text-align: right;
}
.dropdown-icon {
  font-size: 12px;
  margin-left: 5px;
}
</style>

<div class="min-h-screen bg-[#f0f0f0] ">
    <sde>
    <aside class="fixed inset-y-0 left-0 w-48 bg-[#181C2E] shadow-md ">
      <div class="p-6">
        <h1 class="text-2xl font-semibold text-white">Dashboard</h1>
      </div>
      <sidebar class="mt-6">
        <button on:click={() => goto('/salesOrder')} class="dash-button"><Home size={18}/><span>Home</span></button>
        <button class='dash-button'><User size={18}/><span>Customers</span></button>
        <button class='dash-button'><ReceiptIndianRupee size={18}/><span>Sales Orders</span></button>
        <button class='dash-button'><Files size={18}/><span>Invoices</span></button>
      </sidebar>
    </aside>
    </sde>

    <nav>
      <div class="nav-content">
        <ul class="left-nav">
          {#each LeftNavItems as item}
            <li>
              <a href={item.href}>
                <svelte:component this={item.icon} size={20} />
                <span>{item.text}</span>
              </a>
            </li>
          {/each}
        </ul>
        <ul class="right-nav">
          {#each RightNavItems as item}
            <li>
              <a href={item.href}>
                <svelte:component this={item.icon} size={20} />
                <span>{item.text}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
    </nav>

    <!-- Main Content -->
    <header>
      <div>
        <img src="https://vctechnosolutions.com/storage/2020/09/logo-for-website-VC-Abt-1.jpg" alt="VC Tech Logo" class="logo">
          <h1>Hello, USER</h1>
          <p>VC TECHNOSOLUTIONS PRIVATE LIMITED</p>
      </div>
    </header>
  
  <options>
    <ul>
      <a href="google.com" class="active">Dashboard</a>
      <a href="/salesOrder">Announcements</a>
      <a href="google.com">Recent Updates</a>
    </ul>
  </options>
  
  <div class="dashboard-content">
    <div class="card">
      <div class="card-header">
          <h2 class="card-title">Total Receivables</h2>
          <button class="new-button">+New</button>
      </div>
      <p class="total-unpaid">Total Unpaid Invoices ₹3,15,31,060.06</p>
      <div class="progress-bar">
          <div class="progress1"></div>
      </div>
      <div class="amounts">
          <div class="amount">
              <p class="amount-label text-[#007bff]">CURRENT</p>
              <p class="amount-value">₹60,13,645.00</p>
          </div>
          <div class="amount overdue">
              <p class="amount-label text-[#ed8340]">OVERDUE</p>
              <p class="amount-value">₹2,55,17,415.06 <span class="dropdown-icon">▼</span></p>
          </div>
      </div>
   </div>
   <div class="card">
    <div class="card-header">
        <h2 class="card-title">Total Payables</h2>
        <button class="new-button">+New</button>
    </div>
    <p class="total-unpaid">Total Unpaid Invoices ₹1,66,00,994.30</p>
    <div class="progress-bar">
        <div class="progress2"></div>
    </div>
    <div class="amounts">
        <div class="amount">
            <p class="amount-label text-[#007bff]">CURRENT</p>
            <p class="amount-value">₹21,75,292.67</p>
        </div>
        <div class="amount overdue">
            <p class="amount-label text-[#ed8340]">OVERDUE</p>
            <p class="amount-value">₹1,44,25,701.63<span class="dropdown-icon">▼</span></p>
        </div>
    </div>
 </div>
  </div>    
</div>
