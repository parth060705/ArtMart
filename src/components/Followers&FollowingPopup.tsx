import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleChat = (userId: number) => {
    onOpenChange(false); // close popup
    navigate(`/chat/${userId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] w-full rounded-3xl shadow-lg bg-gradient-to-r from-purple-100 via-white to-blue-100 text-[var(--foreground)] p-6 md:p-10">
        <div className="flex flex-col">
          <Tabs defaultValue="followers" className="flex-1">
            <TabsList className="grid w-full grid-cols-2 rounded-xl overflow-hidden bg-[var(--muted)] p-1">
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            {/* Followers */}
            <TabsContent value="followers" className="p-4 max-h-[60vh] overflow-y-auto">
              {followers.length === 0 ? (
                <p className="text-center text-[var(--muted-foreground)]">No followers yet</p>
              ) : (
                <div className="space-y-3">
                  {followers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border shadow-sm">
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)]"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 ml-auto"
                        onClick={() => handleChat(user.id)}
                      >
                        <MessageSquare className="w-4 h-4" /> Chat
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Following */}
            <TabsContent value="following" className="p-4 max-h-[60vh] overflow-y-auto">
              {following.length === 0 ? (
                <p className="text-center text-gray-500">No following yet</p>
              ) : (
                <div className="space-y-3">
                  {following.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border shadow-sm">
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)]"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 ml-auto"
                        onClick={() => handleChat(user.id)}
                      >
                        <MessageSquare className="w-4 h-4" /> Chat
                      </Button>
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
