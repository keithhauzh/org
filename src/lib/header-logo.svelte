<script lang="ts">
    import { jsonStore } from "../stores/jsonStore";
    function clear() {
        jsonStore.clear();
    }
</script>

<button class="text-5xl p-10 z-10 top-0 left-0 absolute">
    <a
        href="/"
        onclick={() => {
            clear();
        }}
    >
        Org (clear all nodes)
    </a>
</button>
