<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  let { label = $bindable(), content = $bindable(), ...props } = $props();
</script>

<div class="w-full h-full flex-col flex px-25">
  <Label class="w-full flex font-bold text-xl p-1">Label</Label>
  <Input class="w-full flex mb-10" bind:value={label} />
  <Label class="w-full flex font-bold text-xl p-1">Content</Label>
  <textarea
    class="border-input
    bg-background
    selection:bg-primary
    dark:bg-input/30
    selection:text-primary-foreground
    ring-offset-background
    placeholder:text-muted-foreground
    shadow-xs
    flex w-full min-w-0
    rounded-md
    border
    px-3 py-1
    text-base
    outline-none
    transition-[color,box-shadow]
    disabled:cursor-not-allowed
    disabled:opacity-50
    md:text-sm
    focus-visible:border-ring
    focus-visible:ring-ring/50
    focus-visible:ring-[3px]
    aria-invalid:ring-destructive/20
    dark:aria-invalid:ring-destructive/40
    aria-invalid:border-destructive
	flex-1
	overflow-auto
	"
    bind:value={content}
  >
  </textarea>
</div>
