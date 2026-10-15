import { useEffect, useState, useCallback } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ViralTree2010 } from "@/features/wish-garden/components/ViralTree2010";
import { BoyWishComposerModal } from "@/features/wish-garden/components/BoyWishComposerModal";
import { SecretCodeModal } from "@/features/wish-garden/components/SecretCodeModal";
import { WishLetterRevealModal } from "@/features/wish-garden/components/WishLetterRevealModal";
import { GirlAccountModal } from "@/features/wish-garden/components/GirlAccountModal";
import { dbService, type AppDatabaseService } from "@/services/app-database";
import type { Boy, Girl, Group } from "@/types/database";

export function WishGarden({ customDb }: { customDb?: AppDatabaseService }) {
  const activeDb = customDb || dbService;
  const router = useRouterState();
  const searchParams = new URLSearchParams(router.location.search);
  const queryToken = searchParams.get("token") || undefined;
  const queryGroup = searchParams.get("group") || undefined;

  const [activeToken, setActiveToken] = useState<string | undefined>(() => {
    if (queryToken) return queryToken;
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("active_girl_token") || undefined;
    }
    return undefined;
  });

  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>(queryGroup);
  const [treeData, setTreeData] = useState(() => activeDb.getTreeData(activeToken, queryGroup));
  const [selectedBoy, setSelectedBoy] = useState<Boy | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isBoyLoginModalOpen, setIsBoyLoginModalOpen] = useState(false);
  const [isGirlAccountModalOpen, setIsGirlAccountModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const refreshTree = useCallback(() => {
    setTreeData(activeDb.getTreeData(activeToken, selectedGroupId));
  }, [activeDb, activeToken, selectedGroupId]);

  useEffect(() => {
    if (queryToken) {
      setActiveToken(queryToken);
    }
  }, [queryToken]);

  useEffect(() => {
    if (queryGroup) {
      setSelectedGroupId(queryGroup);
    }
  }, [queryGroup]);

  useEffect(() => {
    refreshTree();
  }, [refreshTree]);

  function handleUnlockSuccess(group: Group, _boys: Boy[], unlockedBoy?: Boy) {
    refreshTree();
    if (unlockedBoy) {
      setSelectedBoy(unlockedBoy);
      setNotification(`Mã chính xác! Đã mở thư của bạn ${unlockedBoy.name}!`);
    } else {
      setNotification(`Toàn bộ quà từ ${group.group_name} đã được mở thành công trên cây!`);
    }
    setTimeout(() => setNotification(""), 4500);
  }

  function handleGirlRegistered(girl: Girl) {
    setActiveToken(girl.token);
    setSelectedGroupId(girl.group_id);
    setNotification(`Chào mừng bạn ${girl.name} đến với Cây Lời Chúc 20/10!`);
    setTimeout(() => setNotification(""), 4500);
  }

  function handleDirectUnlock(code: string): boolean {
    const clean = code.trim().toUpperCase();
    if (!clean) return false;
    const res = activeDb.verifySecretCode(clean, activeToken);
    if (res.success) {
      refreshTree();
      if (res.unlockedBoy) {
        setNotification(`Mã chính xác! Đã mở thư của bạn ${res.unlockedBoy.name}!`);
        setSelectedBoy(res.unlockedBoy);
      } else if (res.group) {
        handleUnlockSuccess(res.group, res.boys || []);
      }
      setTimeout(() => setNotification(""), 4500);
      return true;
    } else {
      setNotification("Mã chưa chính xác. Bạn kiểm tra lại giúp mình nhé!");
      setTimeout(() => setNotification(""), 3500);
      return false;
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FAF7F2] via-[#F6ECE9] to-[#F1DEE3] flex flex-col items-center justify-between">
      {notification && (
        <div className="fixed top-20 z-50 px-5 py-2.5 rounded-full bg-[#E06D88] text-white text-xs font-semibold shadow-xl animate-bounce">
          {notification}
        </div>
      )}

      <ViralTree2010
        treeTitle={treeData.group?.group_name || "GDGoC HUST"}
        recipientName={treeData.girl?.name}
        boys={treeData.boys}
        isUnlocked={treeData.isUnlocked}
        isBoyUnlocked={treeData.isBoyUnlocked}
        onSelectBoy={(boy) => setSelectedBoy(boy)}
        onOpenSecretCodeModal={() => setIsCodeModalOpen(true)}
        onOpenBoyLoginModal={() => setIsBoyLoginModalOpen(true)}
        onOpenGirlAccountModal={() => setIsGirlAccountModalOpen(true)}
        onDirectUnlockCode={handleDirectUnlock}
      />

      <WishLetterRevealModal
        boy={selectedBoy}
        isUnlocked={Boolean(
          selectedBoy &&
          treeData.isBoyUnlocked &&
          treeData.isBoyUnlocked(selectedBoy)
        )}
        onClose={() => setSelectedBoy(null)}
        onOpenCodeInput={() => setIsCodeModalOpen(true)}
        onDirectUnlockCode={handleDirectUnlock}
      />

      <SecretCodeModal
        isOpen={isCodeModalOpen}
        girlToken={activeToken}
        onClose={() => setIsCodeModalOpen(false)}
        onSuccessUnlock={handleUnlockSuccess}
      />

      <BoyWishComposerModal
        isOpen={isBoyLoginModalOpen}
        onClose={() => setIsBoyLoginModalOpen(false)}
        onWishUpdated={refreshTree}
      />

      <GirlAccountModal
        isOpen={isGirlAccountModalOpen}
        onClose={() => setIsGirlAccountModalOpen(false)}
        onRegistered={handleGirlRegistered}
      />
    </div>
  );
}
