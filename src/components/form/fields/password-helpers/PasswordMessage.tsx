import { Check, X } from 'lucide-react';
import { FC } from 'react';

type Props = {
    requirements: {
        regex: RegExp;
        label: string;
    }[];
    checks: boolean[];
};

export const PasswordMessage: FC<Props> = ({ requirements, checks }) => {
    return (
        <div>
            {requirements.map((req, index) => (
                <div key={req.label} className="flex items-center gap-2 text-xs">
                    {checks[index] ? (
                        <Check className="text-green-500" size={12} />
                    ) : (
                        <X className="text-red-500" size={12} />
                    )}
                    <span className={checks[index] ? 'text-green-500' : 'text-gray-500'}>
						{req.label}
					</span>
                </div>
            ))}
        </div>
    );
};

PasswordMessage.displayName = 'PasswordMessage';