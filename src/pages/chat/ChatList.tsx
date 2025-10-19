import React from 'react';
import { useChatList } from '@/hooks/chat/useChatList';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ChatList = () => {
    const { data: chatList, isLoading } = useChatList();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate(Routes.AuthLoginPage, {
            state: { from: Routes.ChatPage },
            replace: true,
        });
        return null;
    }

    const handleChatClick = (username: string) => {
        navigate(`/chat/${username}`);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 max-w-3xl">
                <Card>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <Skeleton className="h-3 w-12" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-2 max-w-3xl">
            <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                    {chatList?.length ? (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {chatList.map((chat) => (
                                <div
                                    key={chat.user_id}
                                    onClick={() => handleChatClick(chat.username)}
                                    className="flex items-center p-4 hover:bg-accent/10 cursor-pointer transition-colors"
                                >
                                    <Avatar className="h-12 w-12 border-2 border-accent">
                                        <AvatarImage src={chat.profileImage} alt={chat.name} />
                                        <AvatarFallback className="bg-accent/20">
                                            <User className="h-6 w-6 text-accent" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-sm font-semibold truncate">
                                                {chat.name}
                                            </h3>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            {chat.unreadCount > 0 ? (
                                                <span className="bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                                                    {chat.unreadCount}
                                                </span>
                                            ) : (
                                                <MessageCircle className="h-4 w-4 text-muted-foreground mr-2" />
                                            )}
                                            <p className="text-sm text-muted-foreground truncate">
                                                {chat.lastMessageType === 'text' 
                                                    ? chat.lastMessage 
                                                    : chat.lastMessageType === 'image' 
                                                        ? '📷 Image' 
                                                        : '📄 File'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-1">No messages yet</h3>
                            <p className="text-sm text-muted-foreground max-w-md">
                                Start a conversation with other artists and art enthusiasts
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ChatList;
