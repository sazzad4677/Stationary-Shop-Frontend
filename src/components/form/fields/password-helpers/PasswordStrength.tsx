import { cn } from '@/lib/utils';
import { FC } from 'react';
import {getPasswordStrengthColor} from "@/utils/getPasswordStrengthColor.ts";

type Props = {
    strength: number;
};

export const PasswordStrength: FC<Props> = ({ strength }) => {
    return (
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
                className={cn(
                    'h-full transition-all duration-300',
                    getPasswordStrengthColor(strength)
                )}
                style={{ width: `${strength}%` }}
            />
        </div>
    );
};

PasswordStrength.displayName = 'PasswordStrength';