import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import styles from "./tree-container.module.css";
import {createGraph} from "~/components/tree-container/tree-generator";
import { type tSymbol } from "~/components/tree-container/types";

type GraphContainerProps = {
    symbols: tSymbol[];
}

export const TreeContainer = component$(({ symbols }: GraphContainerProps) => {
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(({ cleanup }) => {
        const { destroy } = createGraph(containerRef.value, symbols);
        cleanup(() => destroy());
    });

    return (
        <div ref={containerRef} class={styles.container} />
    );
});
