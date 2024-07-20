import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class TestClient extends ClientProxy {
  connect(): Promise<any> {
    return this.connect();
  }
  close() {
    this.close();
  }
  protected publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    return this.publish(packet, callback);
  }
  protected dispatchEvent<T = any>(packet: ReadPacket): Promise<T> {
    return this.dispatchEvent(packet);
  }

  send<TResult = any, TInput = any>(
    pattern: { cmd: string },
    data: TInput,
  ): Observable<TResult> {
    return this.send<TResult, TInput>(pattern, data);
  }
}
