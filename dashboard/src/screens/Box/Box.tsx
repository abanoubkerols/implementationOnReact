import {
  BarChart3Icon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  HomeIcon,
  LineChartIcon,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

export const Box = (): JSX.Element => {
  // Navigation items data
  const navItems = [
    {
      icon: <HomeIcon className="h-5 w-5" />,
      label: "Dashboard",
      active: true,
    },
    { icon: <BarChart3Icon className="h-5 w-5" />, label: "Analytics" },
    { icon: <UsersIcon className="h-5 w-5" />, label: "Customers" },
    { icon: <CalendarIcon className="h-5 w-5" />, label: "Schedule" },
    { icon: <SettingsIcon className="h-5 w-5" />, label: "Settings" },
  ];

  // Stats data
  const statsData = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      positive: true,
    },
    {
      title: "Subscriptions",
      value: "+2350",
      change: "+180.1%",
      positive: true,
    },
    { title: "Sales", value: "+12,234", change: "+19.5%", positive: true },
    { title: "Active Users", value: "+573", change: "-10.5%", positive: false },
  ];

  // Recent sales data
  const recentSales = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
    },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
    },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <h2 className="text-xl font-bold">Acme Inc</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start ${item.active ? "bg-secondary" : ""}`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="SearchIcon..."
                  className="w-64 pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <BellIcon className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">John Doe</span>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          <div className="grid gap-6">
            {/* Overview section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-4 gap-4">
                {statsData.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <Badge
                            variant={stat.positive ? "default" : "destructive"}
                            className="bg-opacity-10"
                          >
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Overview</h3>
                    <Tabs defaultValue="monthly">
                      <TabsList>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="h-80 w-full">
                    {/* Chart placeholder */}
                    <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                      <LineChartIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Recent Sales</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentSales.map((sale, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{sale.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                        <p className="text-sm font-medium">{sale.amount}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Conversion Rate</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 flex items-center justify-center">
                      <PieChartIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">27.4%</p>
                      <p className="text-sm text-muted-foreground">
                        +1.1% from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Traffic Sources</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 flex items-center justify-center">
                      <BarChart3Icon className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Direct</p>
                        <p className="text-sm font-medium">45%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Organic</p>
                        <p className="text-sm font-medium">35%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Referral</p>
                        <p className="text-sm font-medium">20%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
