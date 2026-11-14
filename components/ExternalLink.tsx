import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    color?: string;
    // Shown right after the text, e.g. a product's logo. Sits outside the text
    // span so the underline stays under the words only.
    trailing?: React.ReactNode;
}

const ExternalLink = ({ href, children, className = "", color, trailing }: ExternalLinkProps) => {
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
            {trailing}
            <ExternalLinkIcon className="w-3 h-3" style={color ? { color } : undefined} />
        </a>
    );
};

export default ExternalLink;

