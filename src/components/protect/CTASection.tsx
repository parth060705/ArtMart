import React from 'react'

const CTASection = () => {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#065B98] via-[#1B7FDC] to-[#0DB8D3] text-white">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your creative work?</h2>
                <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                    Join the waitlist to get early access to Auroraa Protect and be the first to know when we launch.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#hero-section"
                        className="px-8 py-4 bg-white text-[#065B98] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('hero-section')?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }}
                    >
                        Join Waitlist
                    </a>
                </div> */}
            </div>
        </section>
    )
}

export default CTASection
