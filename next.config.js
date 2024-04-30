import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

export function webpack(config, { isServer }) {
    if (isServer) {
        config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
}