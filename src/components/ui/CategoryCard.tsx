import { Category } from "@/types";
import { Image } from "expo-image";
import { ArrowRight } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { Pressable, Text, View } from "react-native";

// lets expo-image accept className
cssInterop(Image, { className: "style" });

// Full class strings so Tailwind can detect them at build time.
// (Never build these dynamically like `bg-[${color}]`.)
const PASTELS = [
    "bg-[#FDE3D3]",
    "bg-[#FFD9E0]",
    "bg-[#FCEBCB]",
    "bg-[#DDEEDD]",
    "bg-[#DCE8F7]",
    "bg-[#E8DDF5]",
];

type Props = {
    item: Category;
    index: number;
    onPress?: (item: Category) => void;
};

export function CategoryCard({ item, index, onPress }: Props) {
    return (
        <Pressable
            onPress={() => onPress?.(item)}
            // API colors are runtime values, so they go in `style`; otherwise use a palette class
            style={item.tint ? { backgroundColor: item.tint } : undefined}
            className={`flex-1 aspect-square overflow-hidden rounded-[28px] p-[18px] active:scale-[0.97] ${item.tint ? "" : PASTELS[index % PASTELS.length]
                }`}
        >
            <Text className="text-lg font-bold text-[#1a1a1a]" numberOfLines={1}>
                {item.name}
            </Text>
            <Text className="mt-1 text-[13px] text-neutral-600">
                {item.itemCount} items
            </Text>

            <Image
                source={item.image}
                className="absolute -bottom-1.5 -right-1.5 h-[62%] w-1/2"
                contentFit="contain"
                contentPosition="bottom right"
                transition={200}
                cachePolicy="memory-disk"
            />

            <View className="absolute bottom-4 left-4 h-11 w-11 items-center justify-center rounded-full bg-white">
                <ArrowRight />
            </View>
        </Pressable>
    );
}