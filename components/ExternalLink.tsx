import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    color?: string;
    // Shown right before the text, e.g. a product's logo. Sits outside the
    // text span so the underline stays under the words only. Give it
    // self-center so it doesn't set the link's baseline.
    leading?: React.ReactNode;
}

const ExternalLink = ({ href, children, className = "", color, leading }: ExternalLinkProps) => {
    const defaultColor = "text-gray-700 hover:text-gray-900";
    const baseClasses = `inline-flex items-baseline gap-1 ${color ? "" : defaultColor} ${className}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
            style={color ? { color } : undefined}
        >
            {leading}
            <span className="underline">{children}</span>
            <ExternalLinkIcon className="w-3 h-3 self-center" style={color ? { color } : undefined} />
        </a>
    );
};

export default ExternalLink;
