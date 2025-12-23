import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    color?: string;
}

const ExternalLink = ({ href, children, className = "", color }: ExternalLinkProps) => {
    const defaultColor = "text-gray-700 hover:text-gray-900";
    const baseClasses = `underline inline-flex items-center gap-1 ${color ? "" : defaultColor} ${className}`;
    
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
            style={color ? { color } : undefined}
        >
            <span>{children}</span>
            <ExternalLinkIcon className="w-3 h-3" style={color ? { color } : undefined} />
        </a>
    );
};

export default ExternalLink;

