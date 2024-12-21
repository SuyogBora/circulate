interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
  }
  
  const FeatureCard = ({ title, description, icon, bgColor }: FeatureCardProps) => {
    return (
      <div className={`p-3 flex items-start gap-4 shadow-lg ${bgColor} rounded-sm`}>
        <span className="flex-shrink-0">{icon}</span>
        <div className="text-start">
          <h6 className="text-sm mb-0.5 font-medium text-[#27272a]">{title}</h6>
          <p className="text-xs dark:text-black/60 text-muted-foreground leading-[1.5]">{description}</p>
        </div>
      </div>
    );
  };
  
  export default FeatureCard;
  