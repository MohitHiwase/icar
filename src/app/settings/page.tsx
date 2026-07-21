'use client';
import { useState } from 'react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initialsBgClass: string;
}

interface Transaction {
  id: string;
  desc: string;
  details: string;
  amount: string;
}

const MOCK_TEAM: TeamMember[] = [
  { id: 'usr-1', initials: 'EV', name: 'Elena Vance', email: 'elena.v@geovision.ai', role: 'Admin', status: 'Active', initialsBgClass: 'bg-secondary-container' },
  { id: 'usr-2', initials: 'MK', name: 'Marcus Kiley', email: 'm.kiley@geovision.ai', role: 'Editor', status: 'Active', initialsBgClass: 'bg-secondary-container' }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', desc: 'GeoVision Subscription - Sept 2024', details: 'Sept 12, 2024 • VISA ending in 4242', amount: '$1,450.00' },
  { id: 'tx-2', desc: 'GeoVision Subscription - Aug 2024', details: 'Aug 12, 2024 • VISA ending in 4242', amount: '$1,450.00' }
];

export default function Page() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  return (
    <div className="min-min-h-[calc(100vh-72px)] bg-[#F8FAFC] text-on-surface font-body-md overflow-x-hidden w-full">
      <div dangerouslySetInnerHTML={{ __html: `
        <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E5E7EB;
            border-radius: 10px;
        }
        .elevation-1 {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
        }
        </style>
      ` }} />
      
      {/*  Header  */}
      

      {/*  Main Content  */}
      <main className=" pt-24 p-10 min-min-h-[calc(100vh-72px)]">
        <div className="w-full">
          {/*  Settings Layout: Sidebar + Panels  */}
          <div className="grid grid-cols-12 gap-8">
            {/*  Category Sidebar  */}
            <div className="col-span-12 lg:col-span-3">
              <nav className="sticky top-28 space-y-1">
                <a className="block px-6 py-4 bg-primary/5 rounded-xl text-primary font-bold transition-all border border-primary/10" href="#profile">Organization Profile</a>
                <a className="block px-6 py-4 hover:bg-surface-container-low rounded-xl text-on-surface-variant transition-all" href="#team">Team Management</a>
                <a className="block px-6 py-4 hover:bg-surface-container-low rounded-xl text-on-surface-variant transition-all" href="#preferences">User Preferences</a>
                <a className="block px-6 py-4 hover:bg-surface-container-low rounded-xl text-on-surface-variant transition-all" href="#billing">Billing &amp; Plan</a>
                <a className="block px-6 py-4 hover:bg-surface-container-low rounded-xl text-on-surface-variant transition-all" href="#security">Security &amp; API</a>
              </nav>
            </div>

            {/*  Settings Panels  */}
            <div className="col-span-12 lg:col-span-9 space-y-8">
              {/*  Organization Profile  */}
              <section className="bg-white rounded-2xl p-8 border border-outline-variant/30" id="profile">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">corporate_fare</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md">Organization Profile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-label-caps text-on-surface-variant uppercase font-semibold">Organization Name</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-low/30" type="text" defaultValue="GeoVision Intelligence Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-label-caps text-on-surface-variant uppercase font-semibold">Industry Vertical</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-low/30" defaultValue="Precision Agriculture">
                      <option>Precision Agriculture</option>
                      <option>Supply Chain Logistics</option>
                      <option>Environmental Monitoring</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] font-label-caps text-on-surface-variant uppercase font-semibold">Primary Headquarter Location</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">location_on</span>
                      <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-low/30" type="text" defaultValue="1200 Innovation Way, Palo Alto, CA" />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant/30 flex justify-end">
                  <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                    Save Changes
                  </button>
                </div>
              </section>

              {/*  Team Management  */}
              <section className="bg-white rounded-2xl p-8 border border-outline-variant/30" id="team">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">groups</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md">Team Management</h3>
                  </div>
                  <button className="flex items-center gap-2 border border-outline-variant px-5 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors font-bold text-body-md">
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Invite Member
                  </button>
                </div>
                <div className="overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-outline-variant/30">
                        <th className="pb-5 text-[11px] font-label-caps text-on-surface-variant uppercase">User</th>
                        <th className="pb-5 text-[11px] font-label-caps text-on-surface-variant uppercase">Role</th>
                        <th className="pb-5 text-[11px] font-label-caps text-on-surface-variant uppercase text-center">Status</th>
                        <th className="pb-5"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/30">
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-surface-container-low/30 transition-colors">
                          <td className="py-5">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full ${member.initialsBgClass} flex items-center justify-center text-primary font-bold text-sm`}>{member.initials}</div>
                              <div>
                                <p className="font-bold text-on-surface">{member.name}</p>
                                <p className="text-xs text-on-surface-variant">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5">
                            <span className="text-xs px-3 py-1 bg-surface-container-high rounded-full text-on-surface font-medium border border-outline-variant/30">{member.role}</span>
                          </td>
                          <td className="py-5 text-center">
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-primary font-bold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> {member.status}
                            </span>
                          </td>
                          <td className="py-5 text-right">
                            <button className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">more_vert</span></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/*  Notification & Preferences  */}
              <section className="bg-white rounded-2xl p-8 border border-outline-variant/30" id="preferences">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md">System Preferences</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-6 border-b border-outline-variant/20">
                    <div>
                      <p className="font-bold text-on-surface text-body-lg">Anomalous Data Alerts</p>
                      <p className="text-sm text-on-surface-variant">Receive instant push notifications when GIS sensors detect unusual soil conditions.</p>
                    </div>
                    <div className="relative inline-block w-11 align-middle select-none">
                      <input defaultChecked className="toggle-checkbox absolute block w-0 h-0 opacity-0" id="toggle1" type="checkbox" />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer relative transition-colors duration-300" htmlFor="toggle1"></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-6">
                    <div>
                      <p className="font-bold text-on-surface text-body-lg">Weekly GIS Intelligence Reports</p>
                      <p className="text-sm text-on-surface-variant">Get a consolidated PDF summary of field health every Monday morning.</p>
                    </div>
                    <div className="relative inline-block w-11 align-middle select-none">
                      <input defaultChecked className="toggle-checkbox absolute block w-0 h-0 opacity-0" id="toggle2" type="checkbox" />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer relative transition-colors duration-300" htmlFor="toggle2"></label>
                    </div>
                  </div>
                </div>
              </section>

              {/*  Billing & Usage  */}
              <section className="bg-white rounded-2xl p-8 border border-outline-variant/30" id="billing">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">payments</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md">Billing &amp; Plan</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30">
                    <p className="text-[11px] font-label-caps text-on-surface-variant uppercase font-semibold mb-3">Current Plan</p>
                    <p className="font-bold text-[24px] text-primary">Enterprise Pro</p>
                    <p className="text-xs text-on-surface-variant mt-2">Next renewal: Oct 12, 2024</p>
                  </div>
                  <div className="p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30">
                    <p className="text-[11px] font-label-caps text-on-surface-variant uppercase font-semibold mb-3">Storage Usage</p>
                    <div className="flex items-baseline gap-2">
                      <p className="font-bold text-[24px] text-on-surface">1.2 TB</p>
                      <p className="text-sm text-on-surface-variant">/ 5 TB</p>
                    </div>
                    <div className="w-full bg-surface-container-high h-2.5 rounded-full mt-4 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `24%` }}></div>
                    </div>
                  </div>
                  <div className="p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30">
                    <p className="text-[11px] font-label-caps text-on-surface-variant uppercase font-semibold mb-3">Active API Keys</p>
                    <p className="font-bold text-[24px] text-on-surface">14 / 20</p>
                    <p className="text-xs text-on-surface-variant mt-2">Managed via Security tab</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-body-lg">Recent Transactions</h4>
                    <button className="text-primary text-sm font-bold hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {transactions.map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-5 bg-surface-container-low/30 border border-outline-variant/20 rounded-2xl">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-outline-variant/30">
                            <span className="material-symbols-outlined text-on-surface-variant">receipt_long</span>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{tx.desc}</p>
                            <p className="text-xs text-on-surface-variant">{tx.details}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-on-surface text-lg">{tx.amount}</p>
                          <button className="text-primary text-[11px] font-bold uppercase tracking-wider hover:underline">Download PDF</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/*  Footer  */}
      <footer className=" p-10 border-t border-outline-variant/30 bg-white">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary/50" style={{ fontVariationSettings: '"' }}>eco</span>
            <p className="font-label-caps text-on-surface-variant uppercase text-[10px] tracking-widest font-semibold">© 2024 GeoVision GIS Intelligence Systems</p>
          </div>
          <div className="flex gap-10 text-[10px] font-label-caps text-on-surface-variant uppercase tracking-[0.15em] font-bold">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">API Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
