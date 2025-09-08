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
      <DialogContent className="sm:max-w-[450px] w-full rounded-3xl shadow-lg bg-gradient-to-r from-purple-100 via-white to-blue-100 text-[var(--foreground)] p-6 md:p-10">
        <div className="flex flex-col">
          {/* Tabs */}
          <Tabs defaultValue="followers" className="flex-1">
            <TabsList className="grid w-full grid-cols-2 rounded-xl overflow-hidden bg-[var(--muted)] p-1">
              <TabsTrigger
                value="followers"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white rounded-lg transition-all"
              >
                Followers
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white rounded-lg transition-all"
              >
                Following
              </TabsTrigger>
            </TabsList>

            {/* Followers List */}
            <TabsContent value="followers" className="p-4 max-h-[60vh] overflow-y-auto">
              {followers.length === 0 ? (
                <p className="text-center text-[var(--muted-foreground)]">No followers yet</p>
              ) : (
                <div className="space-y-3">
                  {followers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-[var(--muted)] shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)]"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-[var(--foreground)]">{user.name}</h3>
                        <p className="text-sm text-[var(--muted-foreground)]">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Following List */}
            <TabsContent value="following" className="p-4 max-h-[60vh] overflow-y-auto">
              {following.length === 0 ? (
                <p className="text-center text-[var(--muted-foreground)]">No following yet</p>
              ) : (
                <div className="space-y-3">
                  {following.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-[var(--muted)] shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)]"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-[var(--foreground)]">{user.name}</h3>
                        <p className="text-sm text-[var(--muted-foreground)]">@{user.username}</p>
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
