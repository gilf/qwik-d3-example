import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import styles from "./graph-container.module.css";
import {createGraph} from "~/components/graph-container/graph-generator";
import { type tSymbol } from "~/components/graph-container/types";

type GraphContainerProps = {
    symbols: tSymbol[];
}

export const GraphContainer = component$(({ symbols }: GraphContainerProps) => {
    const containerRef = useSignal<HTMLDivElement>();

    useVisibleTask$(({ cleanup }) => {
        const { destroy } = createGraph(containerRef.value, symbols);
        cleanup(() => destroy());
    });

    return (
        <div ref={containerRef} class={styles.container} />
    );
});
