import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import styles from "./chord-container.module.css";
import { type tSymbol } from "~/components/tree-container/types";
import {createChord} from "~/components/chord-conatainer/chord-generator";

type ChordContainerProps = {
    symbols: tSymbol[];
}

export const ChordContainer = component$(({ symbols }: ChordContainerProps) => {
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(({ cleanup }) => {
        const { destroy } = createChord(containerRef.value, symbols);
        cleanup(() => destroy());
    });

    return (
        <div ref={containerRef} class={styles.container} />
    );
});
