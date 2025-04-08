
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, MessagesSquare, Users, ArrowUpRight } from "lucide-react";

const AdminHome = () => {
  // Mock statistics data
  const stats = [
    {
      title: "Total Blog Posts",
      value: "24",
      icon: Book,
      change: "+4%",
      changeType: "increase",
    },
    {
      title: "Consultation Requests",
      value: "16",
      icon: MessagesSquare,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Website Visitors",
      value: "1,024",
      icon: Users,
      change: "+9.1%",
      changeType: "increase",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      action: "New consultation request",
      user: "محمد عبدالله",
      time: "30 minutes ago",
    },
    {
      action: "Blog post published",
      user: "Admin",
      time: "2 hours ago",
    },
    {
      action: "Settings updated",
      user: "Admin",
      time: "Yesterday",
    },
    {
      action: "New consultation request",
      user: "فاطمة أحمد",
      time: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your website statistics and activity
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-sm text-green-500 pt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-blue-100 rounded-full p-2">
                  <MessagesSquare className="h-4 w-4 text-blue-700" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{activity.action}</span>
                  <div className="flex text-sm text-muted-foreground">
                    <span>{activity.user}</span>
                    <span className="mx-1">•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
