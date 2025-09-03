import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-[450px] rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="flex flex-col">
          {/* Tabs */}
          <Tabs defaultValue="followers" className="flex-1">
            <TabsList className="grid w-full grid-cols-2 rounded-xl overflow-hidden bg-purple-200/50 p-1">
              <TabsTrigger
                value="followers"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all"
              >
                Followers
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all"
              >
                Following
              </TabsTrigger>
            </TabsList>

            {/* Followers List */}
            <TabsContent value="followers" className="p-4">
              {followers.length === 0 ? (
                <p className="text-center text-gray-800">No followers yet</p>
              ) : (
                <div className="space-y-3">
                  {followers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-purple-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-700"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Following List */}
            <TabsContent value="following" className="p-4">
              {following.length === 0 ? (
                <p className="text-center text-gray-800">No following yet</p>
              ) : (
                <div className="space-y-3">
                  {following.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-purple-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
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
