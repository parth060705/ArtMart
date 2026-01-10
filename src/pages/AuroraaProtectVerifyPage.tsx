import React from 'react'
import VerifySection from '@/components/protect/VerifySection';

const AuroraaProtectVerifyPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans pt-24 px-4 pb-20 relative overflow-hidden flex flex-col items-center justify-center">

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B7FDC]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0DB8D3]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <VerifySection className="relative z-10 w-full" />
    </div>
  )
}

export default AuroraaProtectVerifyPage
