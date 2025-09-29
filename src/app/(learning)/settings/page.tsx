import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Globe, 
  Palette, 
  Shield, 
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings, preferences, and privacy options.',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="space-y-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Learning Level</label>
                    <div className="flex gap-2">
                      <Badge variant="outline">Beginner</Badge>
                      <Badge variant="secondary">Intermediate</Badge>
                      <Badge variant="outline">Advanced</Badge>
                    </div>
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Learning Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Language</label>
                    <select className="w-full p-2 border border-input rounded-md bg-background">
                      <option value="en">English</option>
                      <option value="nl">Dutch</option>
                      <option value="de">German</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Daily Study Goal</label>
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder="30" className="w-20" />
                      <span className="text-sm text-muted-foreground">minutes per day</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learning Focus</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Vocabulary</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Grammar</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Pronunciation</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Translation</span>
                      </label>
                    </div>
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Daily Study Reminders</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Achievement Notifications</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Weekly Progress Reports</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">New Content Available</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Theme</label>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Light</Button>
                      <Button variant="outline" size="sm">Dark</Button>
                      <Button variant="outline" size="sm">System</Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Greek Font Size</label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Small</Button>
                      <Button variant="outline" size="sm">Medium</Button>
                      <Button variant="outline" size="sm">Large</Button>
                    </div>
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Current Password</label>
                    <div className="relative">
                      <Input type="password" placeholder="Enter current password" />
                      <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">New Password</label>
                    <div className="relative">
                      <Input type="password" placeholder="Enter new password" />
                      <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                    <div className="relative">
                      <Input type="password" placeholder="Confirm new password" />
                      <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Export Your Data</p>
                        <p className="text-xs text-muted-foreground">Download all your progress and settings</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
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
}
