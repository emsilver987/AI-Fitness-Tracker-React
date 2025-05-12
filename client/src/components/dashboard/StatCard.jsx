
import { Activity, Award, Clock, Flame} from 'lucide-react';

export const StatCard = ({ title, value, unit, icon, color, bgColor }) => {
    const renderIcon = () => {
      switch (icon) {
        case 'flame': return <Flame className={`${color} w-6 h-6`} />;
        case 'trophy': return <Award className={`${color} w-6 h-6`} />;
        case 'fire': return <Activity className={`${color} w-6 h-6`} />;
        case 'clock': return <Clock className={`${color} w-6 h-6`} />;
        default: return <Activity className={`${color} w-6 h-6`} />;
      }
    };
  
    return (
      <div className={`${bgColor} rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">{title}</h3>
          {renderIcon()}
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{value}</span>
          <span className="ml-1 text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    );
  };