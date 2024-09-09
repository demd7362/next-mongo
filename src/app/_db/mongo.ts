import {MongoClient} from 'mongodb';

// 환경 변수에서 MongoDB URI 가져오기
const uri: string = process.env.MONGODB_URI || '';
const options: any = {useNewUrlParser: true, useUnifiedTopology: true};

// MongoClient 인스턴스 생성
const client: MongoClient = new MongoClient(uri, options);

// 클라이언트의 Promise를 저장할 변수
let clientPromise: Promise<MongoClient>;

// 개발 환경에서는 클라이언트를 전역 변수에 저장하여 재사용
if (process.env.NODE_ENV === 'development') {
    let cachedClientPromise: Promise<MongoClient> = (global as any)._mongoClientPromise;
    if (!cachedClientPromise) {
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // 프로덕션 환경에서는 클라이언트를 직접 연결
    clientPromise = client.connect();
}

export default clientPromise;
