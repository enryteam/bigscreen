package com.lapland.core.mq.consumer.queue;

import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

/**
 * 队列消息监听器
 * @author zz
 * @date 上午9:28 18-7-25
 */
@Component
public class QueueReceiver1 implements MessageListener {

    @Override
    public void onMessage(Message message) {
        try {
            System.out.println("QueueReceiver1接收到消息:" + ((TextMessage) message).getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
