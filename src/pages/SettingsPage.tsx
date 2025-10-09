import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Palette, User, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const SettingsPage = () => {
    const { userProfile } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [activeTab, setActiveTab] = useState('appearance');
    const navigate = useNavigate();

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setIsLoading(true);
            // TODO: Implement password update logic
            console.log('Update password:', { currentPassword, newPassword });
            toast.success('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to update password');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) {
            toast.error('Please enter your email address');
            return;
        }

        try {
            setIsLoading(true);
            // TODO: Implement password reset email logic
            console.log('Send password reset email to:', resetEmail);
            toast.success('Check your email for a password reset link');
            setResetEmail('');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to send reset email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>
                    <nav className="space-y-1">
                        {userProfile && (
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'security' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--muted)]'}`}
                            >
                                <Lock className="w-4 h-4" />
                                <span>Security</span>
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab('appearance')}
                            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'appearance' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--muted)]'}`}
                        >
                            <Palette className="w-4 h-4" />
                            <span>Appearance</span>
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Security Tab - Only show if user is logged in */}
                    {activeTab === 'security' && userProfile && (
                        <div className="space-y-6">
                            {/* Change Password */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Change Password</CardTitle>
                                        <CardDescription>Update your password associated with your account.</CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handlePasswordUpdate}>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label htmlFor="current-password">Current Password</Label>
                                                <Input
                                                    id="current-password"
                                                    type="password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="new-password">New Password</Label>
                                                <Input
                                                    id="new-password"
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                    minLength={8}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                                <Input
                                                    id="confirm-password"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit" disabled={isLoading}>
                                                {isLoading ? 'Updating...' : 'Update Password'}
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>

                            {/* Forgot Password */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Forgot Password</CardTitle>
                                    <CardDescription>Request a password reset link to your email.</CardDescription>
                                </CardHeader>
                                <form onSubmit={handlePasswordReset}>
                                    <CardContent>
                                        <div>
                                            <Label htmlFor="reset-email">Email Address</Label>
                                            <div className="flex gap-2 mt-2">
                                                <Input
                                                    id="reset-email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={resetEmail}
                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                    required
                                                />
                                                <Button type="submit" variant="outline" disabled={isLoading}>
                                                    {isLoading ? 'Sending...' : 'Send Link'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </form>
                            </Card>
                        </div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize the appearance of the app.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <h3 className="font-medium">Theme</h3>
                                        <p className="text-sm text-[var(--muted-foreground)]">
                                            Choose between light and dark themes
                                        </p>
                                    </div>
                                    <ThemeSwitcher />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
