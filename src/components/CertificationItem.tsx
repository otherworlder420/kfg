import { CheckCircle, Shield, Award, Leaf, Globe } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  "check-circle": CheckCircle,
  shield: Shield,
  award: Award,
  leaf: Leaf,
  globe: Globe,
};

interface CertificationItemProps {
  icon: string;
  label: string;
}

export default function CertificationItem({ icon, label }: CertificationItemProps) {
  const IconComponent = iconMap[icon] || CheckCircle;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <IconComponent size={40} className="text-gold-400" strokeWidth={1.5} />
      <span className="text-sm font-medium text-dark-700">{label}</span>
    </div>
  );
}
