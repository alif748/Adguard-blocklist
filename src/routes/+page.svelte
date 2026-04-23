<script lang="ts">
    import { txtFiles } from '$lib/files';
    import favicon from '$lib/assets/favicon.svg';
    import Toastify from 'toastify-js';
    import 'toastify-js/src/toastify.css';

    async function copyLink(path: string, label: string) {
        const normalized = `/${path.replace(/^\/+/, '')}`;
        const fullUrl = `${window.location.origin}${normalized}`;

        try {
        await navigator.clipboard.writeText(fullUrl);

        Toastify({
            text: `${label} link copied `,
            duration: 2200,
            gravity: 'bottom',
            position: 'center',
            stopOnFocus: true,
            close: true,
            style: {
            background: '#4e8c5d',
            color: '#e2e8f0',
            border: '1px solid #334155',
            boxShadow: 'none'
            }
        }).showToast();
        } catch (error) {
        Toastify({
            text: 'Failed to copy link',
            duration: 2600,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            close: true,
            style: {
            background: '#7f1d1d',
            color: '#fee2e2',
            border: '1px solid #991b1b',
            boxShadow: 'none'
            }
        }).showToast();

        console.error('Copy failed', error);
        }
    }
</script>

<svelte:head>
    <title>Adguard Blocklists</title>
    <meta name="description" content="List of generated Adguard Blocklists" />
</svelte:head>

<div class="page">
    <h1>
        Adguard Blocklists
        <img src={favicon} alt="" class="icon" />
    </h1>

    <div class="grid">
        {#each txtFiles as file}
            <div class="file-card">
                <a
                class="file-link"
                href={file.fileName}
                rel="noopener noreferrer"
                >
                <span class="title">{file.label}</span>
                <span class="name">{file.fileName}</span>
                </a>

                <button
                class="copy-button"
                type="button"
                aria-label={`Copy link for ${file.label}`}
                onclick={() => copyLink(file.fileName, file.label)}
                >
                Copy link
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #0f172a;
        color: #e2e8f0;
    }

    :global(.toastify) {
        border-radius: 12px;
        padding: 12px 14px;
        font-size: 14px;
    }

    .page {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    h1 {
        margin: 0 0 24px;
        font-size: 32px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 16px;
    }

    .file-card {
        display: flex;
        align-items: stretch;
        gap: 12px;
        padding: 18px;
        border-radius: 14px;
        background: #1e293b;
        border: 1px solid #334155;
        transition: 0.2s ease;
    }

    .file-card:hover {
        background: #334155;
        transform: translateY(-2px);
    }

    .file-link {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-decoration: none;
        color: inherit;
    }

    .title {
        font-size: 18px;
        font-weight: 700;
    }

    .name {
        font-size: 13px;
        color: #94a3b8;
        word-break: break-all;
    }

    .copy-button {
        align-self: center;
        border: 1px solid #475569;
        background: #0f172a;
        color: #e2e8f0;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 14px;
        cursor: pointer;
        white-space: nowrap;
    }

    .copy-button:hover {
        background: #1e293b;
    }
</style>