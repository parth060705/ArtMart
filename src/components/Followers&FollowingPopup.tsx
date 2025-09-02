import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
  following,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full p-0 overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white">
        {/* Header */}
        <DialogHeader className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <DialogTitle className="text-lg font-semibold">Connections</DialogTitle>
          <DialogClose className="text-gray-500 hover:text-gray-800 transition-colors">✕</DialogClose>
        </DialogHeader>

        <Tabs defaultValue="followers" className="flex flex-col">
          {/* Tabs with gap */}
          <TabsList className="flex justify-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
            <TabsTrigger
              value="followers"
              className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm hover:bg-gray-100 transition"
            >
              Followers
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm hover:bg-gray-100 transition"
            >
              Following
            </TabsTrigger>
          </TabsList>

          {/* Followers Tab */}
          <TabsContent value="followers" className="p-4 max-h-96 overflow-y-auto">
            {followers.length === 0 ? (
              <p className="text-center text-gray-500">No followers yet</p>
            ) : (
              <div className="space-y-3">
                {followers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                    <Button size="sm" className="ml-auto px-4">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="p-4 max-h-96 overflow-y-auto">
            {following.length === 0 ? (
              <p className="text-center text-gray-500">No following yet</p>
            ) : (
              <div className="space-y-3">
                {following.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                    <Button size="sm" className="ml-auto px-4">
                      Following
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersAndFollowingPopup;
