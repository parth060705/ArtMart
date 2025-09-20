import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import placeholderProfileImage from "@/assets/placeholder-profile-image.jpg";
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
      <DialogContent className="sm:w-full w-[450px] rounded-xl shadow-lg bg-gradient-to-r from-purple-100 via-white to-blue-100 text-[var(--foreground)] p-2 md:p-10">
        <div className="flex flex-col pt-8">
          <Tabs defaultValue="followers" className="flex-1">
            <TabsList className="grid w-full grid-cols-2 rounded-xl overflow-hidden bg-[var(--muted)] p-1">
              <TabsTrigger
                value="followers"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Followers
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Following
              </TabsTrigger>
            </TabsList>

            {/* Followers */}
            <TabsContent
              value="followers"
              className="md:p-4 max-h-[60vh] overflow-y-auto"
            >
              {followers.length === 0 ? (
                <p className="text-center text-[var(--muted-foreground)]">
                  No followers yet
                </p>
              ) : (
                <div className="space-y-3">
                  {followers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border shadow-sm"
                    >
                      <img
                        src={user.profileImage || placeholderProfileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)]"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                        <h3 className="text-[10px] md:text-base artwfont-semibold">{user.name}</h3>
                      </div>
                      <Button
                        size="sm"
                        className="flex items-center gap-1 ml-auto bg-blue-400 text-white hover:bg-blue-600"
                        onClick={() => handleChat(user.id)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Following */}
            <TabsContent
              value="following"
              className="md:p-4 max-h-[60vh] overflow-y-auto"
            >
              {following.length === 0 ? (
                <p className="text-center text-gray-500">No following yet</p>
              ) : (
                <div className="space-y-3">
                  {following.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border shadow-sm"
                    >
                      <img
                        src={user.profileImage || placeholderProfileImage}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)]"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                        <h3 className="text-[10px] md:text-base font-semibold">{user.name}</h3>
                      </div>
                      <Button
                        size="sm"
                        className="flex items-center gap-1 ml-auto bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => handleChat(user.id)}
                      >
                        <MessageSquare className="w-4 h-4" />
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
