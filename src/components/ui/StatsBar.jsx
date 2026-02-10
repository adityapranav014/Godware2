import { Star, Truck, Users, Zap } from 'lucide-react';

const stats = [
    { icon: Users, value: "10,000+", label: "Athletes", highlight: false },
    { icon: Star, value: "4.5★", label: "Avg Rating", highlight: true },
    { icon: Truck, value: "Free", label: "Shipping", highlight: false },
    { icon: Zap, value: "69%", label: "Off Sale", highlight: true },
];

const StatsBar = () => {
    return (
        <div className="w-full py-6 sm:py-8 bg-dark-950 border-y border-white/5">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 justify-center"
                            >
                                <div className={`p-2 rounded-lg ${stat.highlight ? 'bg-gold-500/10' : 'bg-white/5'}`}>
                                    <Icon
                                        size={18}
                                        className={stat.highlight ? 'text-gold-500' : 'text-white/50'}
                                        strokeWidth={2}
                                    />
                                </div>
                                <div>
                                    <p className={`text-lg sm:text-xl font-bold font-display ${stat.highlight ? 'text-gold-400' : 'text-white'}`}>
                                        {stat.value}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-dark-400 font-sans uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
