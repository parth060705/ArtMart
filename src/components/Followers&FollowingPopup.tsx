import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FollowersAndFollowingPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  followers: User[];
  following: User[];
}

const FollowersAndFollowingPopup: React.FC<FollowersAndFollowingPopupProps> = ({
  open,
  onOpenChange,
  followers,
  following
}) => {
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col">
          <Tabs defaultValue="followers" className="flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="followers" className="p-4">
              {followers.length === 0 ? (
                <p className="text-center text-gray-500">No followers yet</p>
              ) : (
                <div className="space-y-2">
                  {followers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="following" className="p-4">
              {following.length === 0 ? (
                <p className="text-center text-gray-500">No following yet</p>
              ) : (
                <div className="space-y-2">
                  {following.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersAndFollowingPopup;
