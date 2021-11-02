export interface IAssetTransactionMetadata {
    key: string;
    value: object;
}
export interface IAssetTransactionMetadataBalanceAggregate {
    aggregate: {
        count: string;
    }
}

export interface IAssetTransactionMetadataInputOutputToken {
    asset: {
        assetId: string;
    }
}

export interface IAssetTransactionMetadataInputOutput {
    tokens: IAssetTransactionMetadataInputOutputToken[];
    address: string;
}

export interface ITransactionMetadataResponse {
    hash: string;
    metadata: IAssetTransactionMetadata[];
    outputs_aggregate: IAssetTransactionMetadataBalanceAggregate;
    inputs_aggregate: IAssetTransactionMetadataBalanceAggregate;
    inputs: IAssetTransactionMetadataInputOutput[];
    outputs: IAssetTransactionMetadataInputOutput[];
    includedAt: string;
}

export interface IAssetTransactionMetadataResponse {
    hash: string;
    metadata: IAssetTransactionMetadata[];
    isMintTransaction: boolean;
    includedAt: string;
}
