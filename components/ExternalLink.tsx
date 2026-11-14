import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    color?: string;
    // Shown right before the text, e.g. a product's logo. The underline runs
    // under both the logo and the text.
    leading?: React.ReactNode;
}

const ExternalLink = ({ href, children, className = "", color, leading }: ExternalLinkProps) => {
    const defaultColor = "text-gray-700 hover:text-gray-900";
    // text-decoration skips images, so with a leading element the underline is
    // drawn as a bottom border spanning the logo and text instead.
    const underline = leading ? "border-b border-current" : "underline";
    const baseClasses = `inline-flex items-center gap-1 ${leading ? "" : underline} ${color ? "" : defaultColor} ${className}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
            style={color ? { color } : undefined}
        >
            {leading ? (
                <span className={`inline-flex items-center gap-1 ${underline}`}>
                    {leading}
                    <span>{children}</span>
                </span>
            ) : (
                <span>{children}</span>
            )}
            <ExternalLinkIcon className="w-3 h-3" style={color ? { color } : undefined} />
        </a>
    );
};

export default ExternalLink;
