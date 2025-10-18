import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useChangePassword } from '@/hooks/user/useChangePassword';

const SettingsPage = () => {
    const { userProfile, logout } = useAuth();
    const navigate = useNavigate();
    const { mutateAsync: changePasswordMutation, isPending: changePasswordPending } = useChangePassword();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('New Passwords and Confirm Password do not match');
            return;
        }

        try {
            await changePasswordMutation({
                old_password: currentPassword,
                new_password: newPassword
            });
            toast.success('Password updated successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to update password');
        }
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully!');
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
    };

    return (
        <div className="container mx-auto px-4 pb-8 md:pt-8 max-w-4xl mb-20 md:mb-0">
            <div className="flex flex-col gap-4">
                <button onClick={() => navigate(-1)} className='md:hidden'>
                    <ArrowLeft />
                </button>

                <Card>
                    <CardContent>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h3 className="font-medium">Theme</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">Choose between light and dark themes</p>
                            </div>
                            <ThemeSwitcher />
                        </div>
                    </CardContent>
                </Card>

                {userProfile && (
                    <div className="space-y-6">
                        {/* Change Password */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>Update your password associated with your account.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleChangePassword}>
                                <CardContent className="space-y-4">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />

                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} />

                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={changePasswordPending}>{changePasswordPending ? 'Updating...' : 'Update Password'}</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                )}

                {userProfile && (
                    <div className='flex flex-col gap-2'>
                        <Link to={`/me/profile/${userProfile?.username}/update`}>
                            <Button variant="default" className="px-6 font-semibold cursor-pointer">Update Profile</Button>
                        </Link>
                        <Button onClick={handleLogout} className="w-max bg-red-600">Logout</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;

